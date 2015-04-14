var Twit = require('./node_modules/twit/lib/twitter');
var fs = require('fs');

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
	var self = this;
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
		callback(null,self,friends);
	});
}

FeelBot.prototype.readFeed = function(err,self,user_ids,callback){
	if (err){return callback(err);}
	user_ids.forEach(function(user){
		self.twit.get('statuses/user_timeline'
				, {user_id: user, count: 40, trim_user: true, exclude_replies: true, include_rts: false}
				, function(err,userTweets){
					if(err){return callback(err);}
					var tweetTexts = [];
					userTweets.forEach(function(tweetObj){
						tweetTexts.push(tweetObj.text)
					});
					return self.checkDepression(null,tweetTexts);
		});
	});
	
}

FeelBot.prototype.follow = function(user_id,callback){
	this.twit.post('friendships/create', {id: user_id}, callback);
}

FeelBot.prototype.checkDepression = function(err,tweetTexts){
	var tweets = tweetTexts.slice();
	tweets = tweets.join(' ').toUpperCase().replace(/[^\w\s]/g,'').replace(/HTTP\w+/g,'').replace(/\s{2,}/g," ");//.split(' ');
	console.log(tweets);
}