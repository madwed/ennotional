var Twit = require('./node_modules/twit/lib/twitter');

var FeelBot = module.exports = function(config){
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

FeelBot.prototype.findFriends = function(params,callback){
	this.twit.get('search/tweets',params,function(err,searchResults){
		if(err){return callback(err);}

		var tweets = searchResults.statuses;
		var friends = [];
		for(var searchResult = 0; searchResult < tweets.length; searchResult++){
			var tweet = tweets[searchResult];
			if(tweet.retweeted_status || tweet.user.protected){
				continue;
			}else{
				friends.push(tweet.user.id_str);
			}
		}
		return friends;
	});
}

FeelBot.prototype.readFeed = function(user_id,callback){
	this.twit.get('statuses/user_timeline'
		, {user_id: user, count: 40, trim_user: true, exclude_replies: true, include_rts: false}
		, function(err,userTweets){
			if(err){return callback(err);}
			var tweetTexts = [];
			userTweets.forEach(function(tweetObj){
				tweetTexts.push(tweetObj.text)
			});
			return tweetTexts;
		});
}

FeelBot.prototype.follow = function(user_id,callback){
	this.twit.post('friendships/create', {id: user_id}, callback);
}