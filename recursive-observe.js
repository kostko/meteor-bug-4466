itemsA = new Mongo.Collection('itemsA');
itemsB = new Mongo.Collection('itemsB');
itemsA.insert({foo: 'bar'});
itemsB.insert({goo: 'moo'});

Meteor.startup(function() {
  console.log('calling outer observeChanges');
  itemsA.find().observeChanges({
    added: function(id, fields) {
      console.log('calling inner observeChanges');
      itemsB.find().observeChanges({
        added: function(id, fields) {
          itemsA.find().observeChanges({
            added: function(id, fields) {
              console.log('most inner callback');
            }
          });
        }
      });
      console.log('inner observeChanges done');
    },
  });

  console.log('outer observeChanges done');
});
