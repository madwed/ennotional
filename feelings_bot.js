var Twit = require('./node_modules/twit/lib/twitter');
var conf = require('./node_modules/twit/config1');

var FeelBot /*= modules.exports*/ = function(config){
	this.twit = new Twit(config);
}

FeelBot.prototype.tweet = function(status,callback){
	if(typeof status !== 'string') {
    	return callback(new Error('tweet must be of type String'));
  	} else if(status.length > 140) {
    	return callback(new Error('tweet is too long: ' + status.length));
  	}
  	this.twit.post('statuses/update', { status: status }, callback);
}

FeelBot.prototype.findFriend = function(params,callback){
	var self = this;

	this.twit.get('search/tweets',params,function(err,searchResults){
		if(err){return callback(err);}

		var tweets = searchResults.statuses;
		for(var searchResult = 0; searchResult < tweets.length; searchResult++){
			var tweet = tweets[searchResult];
			if(tweet.retweeted_status || tweet.user.protected){
				continue;
			}else{
				var user = tweet.user.id_str;
				self.twit.get('statuses/user_timeline'
					, {user_id: user, exclude_replies: true, include_rts: false}
					, function(err,userTweets){
						if(err){return callback(err);}
						var recent = [];
						userTweets.forEach(function(tweetObj){
							recent.push(tweetObj.text)
						});
						console.log(recent);

					});
				break;
			}
		}

	})
}

var feeler = new FeelBot(conf);

feeler.findFriend({q: "depression", result_type:"recent"}, console.log);



function handleError(err) {
  console.error('response status:', err.statusCode);
  console.error('data:', err.data);
}