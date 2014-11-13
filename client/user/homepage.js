Template.homepage.helpers({
    "inStaging": function() {
        return Battles.find({"players.PXNNqMhKonXj7wdYs": {$exists: true}}).count() > 0;
    },
    "battle": function() {
        return Battles.findOne({"players.PXNNqMhKonXj7wdYs": {$exists: true}});
    }
});