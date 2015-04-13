var fs = require('fs');
var sadStream = fs.createReadStream(./feelings/sad.txt);



// happy = 1
// sad = -1
// not = search for next word, next word * -2;
// so 'not sad' = 2
// therefore when searching string "I am not sad"
// total = 0
// finds not, searches, finds not sad, total = 2
// finds sad, total = 2 - 1 = 1