var SadBot = require('./sadBot'), config = require('./node_modules/twit/config1');

var en = new SadBot(config);

en.findFriend({q: "depression", result_type:"recent"}, console.log);




function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}