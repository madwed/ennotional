var fs = require('fs');
var split = require('split');
var through = require('through2');
var concat = require('concat-stream');
var writeSad = fs.createWriteStream("./feelings/sortedSad.txt");

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

fs.readFile('./feelings/sad.txt',function(err,data){
	if(err) console.log(err);
	fs.writeFile('./feelings/sortedSad.txt',data.toString().toUpperCase().split('\n').sort().getUnique().join('\n'),function(err){
		if(err)console.log(err);
		console.log('saved');
	});
})


// happy = 1
// sad = -1
// not = search for next word, next word * -2;
// so 'not sad' = 2
// therefore when searching string "I am not sad"
// total = 0
// finds not, searches, finds not sad, total = 2
// finds sad, total = 2 - 1 = 1