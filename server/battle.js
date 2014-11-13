
Meteor.methods({
    'joinBattle': function(oid) {
        var player = {};
        player["players." + this.userId] = {};
        Battles.upsert({story: oid}, {$set:player});
    }
});