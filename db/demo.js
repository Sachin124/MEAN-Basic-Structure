// function callMe(input1){    
//     return function(input2){
//         return function(input3){
//             let additon = input1 + input2 + input3;            
//              return additon;
//         }
//     }    
// }


// callMe(10)(20)(30);
var fs = require('fs')
fs.open('./mongoose.js', finishedReading)

function finishedReading(error, movieData) {
  if (error) return console.error(error)
  // do something with the movieData
}