var SadBot = require('./sadBot'), config = require('./node_modules/twit/config1');

var en = new SadBot(config);

en.findFriends(, en.readFeed);

en.findTheSad = function(callback){
	en.findFriends({q: "depression", result_type:"recent"},function(callback){
		en.readFeed(_,_,)
	})
}


function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}