

var charID = 1009664;
var timestamp = new Date().getTime();
var apikey = "96b65e16cae4310e026174023b8d08b1";
var secretkey= "3656ff9c1551c01685aedbcebd11e8fada794c33";
var hash = "eb286c69aed6697eaf3acca2d1208a97";
console.log(hash)


console.log(timestamp)
$.ajax({
    url: "https://gateway.marvel.com:443/v1/public/characters?name=thor&apikey=96b65e16cae4310e026174023b8d08b1&hash=" + hash+  "&ts=" + timestamp,
    method: "GET",

}).fail(function (response){
console.log(response)

})



