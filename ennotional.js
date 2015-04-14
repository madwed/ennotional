var SadBot = require('./sadBot'), config = require('./node_modules/twit/config1');

var en = new SadBot(config);

en.findFriends({q: "depression", result_type:"recent"}, en.readFeed);


function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}