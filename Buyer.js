var stream = require('getstream');
// Instantiate a new client (server side)
client = stream.connect('r6h679xsbd7k', 'uu7sjcrnxp683mdfvqa8kshp4sgy8fwks2pufe2tmz9a2e2hh37vb8b5quzgv7xt', '25642');
var user1 = client.feed('user', '1');

//creates read only token from sever client
var readonlyToken = client.feed('user', '1').getReadOnlyToken();

// Create a bit more complex activity
var activity = {
	'name': 'Tom', 
    'started_at': new Date(),
    'order_time': '2016-04-20T17:47:40.529165',
    'order_details': 'PS4',
    'order_price': 8, //calculated from algorithm
    'item_price': 300,
    'buyer_number': 07512345678,
 	'buyer_status': 'N/A',
    'shop_name': 'Tesco',
    'location': {'type': 'point', 'coordinates': [37.769722,-122.476944] }
};

//Adds activity
user1.addActivity(activity)
   .then(function(data) { /* on success */ })
   .catch(function(reason) { /* on failure */ });


// update the buyer status value for the activity
activity.buyer_status = 'accepted';

// send the update to the APIs
client.updateActivities([activity]);

//client side
// Instantiate a new client (client side)
client = stream.connect('r6h679xsbd7k', null, '25642');

//user 2 gets read only token from user 1
var user1 = client.feed('user', '1', readonlyToken);

//gets data
user1.get({limit:1, mark_seen:true})
    .then(function(data) { /* on success */ })
    .catch(function(reason) { /* on failure */ });


