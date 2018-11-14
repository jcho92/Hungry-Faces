
var age = 19;
var beauty =50;
var charID = 624;
var timestamp = new Date().getTime();
var apikey = "96b65e16cae4310e026174023b8d08b1";
var secretkey= "3656ff9c1551c01685aedbcebd11e8fada794c33";


console.log("newest");


console.log(timestamp)
$.ajax({
    url: "https://gateway.marvel.com:443/v1/public/characters/1009"+ charID +"&apikey=" +apikey+ "&ts=" + timestamp,
    method: "GET",

}).then(function (response){
console.log(response)

})



