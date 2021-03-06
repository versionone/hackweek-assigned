/*
 instance.executeOperation("Story:1945", "QuickSignup", function() {
 })*/

Meteor.startup(function UpdateAllStories() {
    var Fiber = Npm.require('fibers');
    var instance = new v1("http://172.16.51.133/VersionOne", "admin", "admin");

    instance.getStories(function(stories) {
        new Fiber(function() {
            Stories.remove({});
            _.each(stories[0], function(s) {
                Stories.insert({
                    oid: s._oid,
                    name: s.Name
                })
            })
        }).run();
    });
});


var url = Npm.require('url');
var v1sdk = Meteor.npmRequire('v1jssdk');
var V1Meta = v1sdk.V1Meta;
var V1Server = v1sdk.V1Server;
var creds = {};

v1 = function(v1Url, username, password) {
    var urlInfo = url.parse(v1Url);
    var hostname = urlInfo.hostname;
    var instance = urlInfo.pathname.replace('/', '');
    var protocol = urlInfo.protocol.replace(':', '');
    var port = urlInfo.port;
    if (!urlInfo.port)
        port = protocol == "https" ? 443 : 80;

    creds.username = username;
    creds.password = password;
    creds.hostname = hostname;
    creds.instance = instance;

    this._server = new V1Server(hostname, instance, username, password, port, protocol);
    this._v1 = new V1Meta(this._server);
};

v1.prototype.create = function(assetType, attributes, callback) {
    this._v1.create(assetType, attributes, function(err, rawResult) {
        if (err) console.log(err);

        if (!rawResult) return callback;
        var result = {
            oid: rawResult._v1_id,
            assetType: rawResult._v1_id.split(':')[0],
            name: rawResult._v1_current_data.Name
        };

        callback(null, result);
    });
};

v1.prototype.update = function(oid, attributes, callback) {
    var idTokens = oid.split(":");
    var assetType = idTokens[0];
    var id = idTokens[1];
    this._v1.update(assetType, id, attributes, function(err, rawResult) {
        if (err) console.log(err);

        if (!rawResult) return callback(err);
        var result = rawResult._v1_current_data;
        callback(null, result);
    });
};

v1.prototype.executeOperation = function(oid, operation, callback) {
    var idTokens = oid.split(":");
    var assetType = idTokens[0];
    var id = idTokens[1];

    this._server.execute_operation({
        asset_type_name: assetType,
        id: id,
        opname: operation
    }, function(err, rawResult) {
        if (err) console.log(err);

        if (!rawResult) return callback(err);
        var result = rawResult._v1_current_data;
        callback(null, result);
    });
};

/*
 function stripTrailingSlash(str) {
 if(str.substr(-1) == '/') {
 return str.substr(0, str.length - 1);
 }
 return str;
 }*/

v1.prototype.getStories = function(resultCallback) {
    var http = Npm.require('http');


    var options = {
        auth: creds.username + ":" + creds.password,
        host: creds.hostname,
        method: 'POST',
        path: "/" + creds.instance + '/query.legacy.v1'
    };

    callback = function(response) {

        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function(chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function() {
            resultCallback(JSON.parse(str));
        });
    }


    var req = http.request(options, callback);

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });


    var query = 'from: Story \nselect:\n  - Name';

    req.write(query);
    req.end();
};