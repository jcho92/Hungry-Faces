
var timestamp = new Date().getTime();
var apikey = "96b65e16cae4310e026174023b8d08b1";
var secretkey = "3656ff9c1551c01685aedbcebd11e8fada794c33";


var imageURL = "https://raw.githubusercontent.com/jcho92/Hungry-Faces/master/Screen%20Shot%202018-11-08%20at%206.56.59%20PM.png"
$.ajax({
    url: "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=lYJn2ec5zAnhgiO01Q5cMILRDs9laP4I&api_secret=9NCT_mXUokztZLOwk5hUqyLwB5aOLYI-&image_url=" + imageURL,
    type: "POST"
}).then(function (response) {
    console.log(response.faces)
    var face_token = response.faces[0].face_token;
    console.log(face_token)
    $.ajax({
        url: "https://api-us.faceplusplus.com/facepp/v3/face/analyze?api_key=lYJn2ec5zAnhgiO01Q5cMILRDs9laP4I&api_secret=9NCT_mXUokztZLOwk5hUqyLwB5aOLYI-&face_tokens=" + face_token + "&return_attributes=gender,age,smiling,ethnicity,beauty",
        type: "POST"
    }).then(function (response) {
        console.log(response);
        console.log(response.faces[0].attributes.age.value);
        console.log(response.faces[0].attributes.gender.value);
        console.log(response.faces[0].attributes.ethnicity.value);
        console.log(response.faces[0].attributes.beauty.female_score);
        console.log(response.faces[0].attributes.beauty.male_score);
        var charID = (Math.floor(response.faces[0].attributes.beauty.male_score + response.faces[0].attributes.beauty.female_score) / 2) * 10 + response.faces[0].attributes.age.value;
        console.log(charID)
        localStorage.setItem("CharID", charID);
    })
    .then(function () {
        var marvelID =  localStorage.getItem("CharID");
        var queryURL = "https://gateway.marvel.com:443/v1/public/characters/1009" + marvelID + "?apikey=" + apikey + "&ts=" + timestamp;
        console.log(timestamp)
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET",

        }).then(function (response) {
            console.log(response)
            console.log(response.data.results[0].name)
            console.log(response.data.results[0].thumbnail.path)
            console.log(response.data.results[0].thumbnail.extension)
            
            var urlPath = response.data.results[0].thumbnail.path
            var urlExtension = response.data.results[0].thumbnail.extension
            var marvelImage = urlPath+"."+ urlExtension;
            console.log(marvelImage)

        })
     })



})

