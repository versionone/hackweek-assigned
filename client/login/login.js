Template.login.events({
    'submit form': function(e) {
        e.preventDefault();
        var user = form2js(e.currentTarget);
        user.plaintextPasswordTisTis = user.password;
        Accounts.createUser(user);
        /*Meteor.call("loginV1User", data, function() {
            Meter.loginWithPassword(data.username, data.password);
        });*/
    }
});