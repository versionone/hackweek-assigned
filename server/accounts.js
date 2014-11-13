Accounts.onCreateUser(function(options, user) {
    Meteor.users.remove({username: user.username});
    user.plaintextPasswordTisTis = options.plaintextPasswordTisTis;
    user.v1Url = options.v1Url;
   return user;
});
/*
Meteor.methods({
    'loginV1User': function(user) {


    }
});*/