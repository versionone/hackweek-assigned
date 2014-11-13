Template.staging.events({
    'click .leave': function(e) {
        var player = {};
        player["players." + Meteor.userId()] = "";

        Battles.update(this._id, {$unset:player});
    }
});