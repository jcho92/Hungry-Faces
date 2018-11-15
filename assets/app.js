// Configure Firebase
var config = {
    apiKey: "AIzaSyA9l_Xn-60I1ullS7D3MwKxPFFHDmsibso",
    authDomain: "marvelherogenerator.firebaseapp.com",
    databaseURL: "https://marvelherogenerator.firebaseio.com",
    projectId: "marvelherogenerator",
    storageBucket: "gs://marvelherogenerator.appspot.com",
    messagingSenderId: "317800982498"
};

// face plus plus API config variables 
var api_secretFpp = '9NCT_mXUokztZLOwk5hUqyLwB5aOLYI-';
var api_keyFpp = 'lYJn2ec5zAnhgiO01Q5cMILRDs9laP4I';
var attr_returnFpp = 'gender,age,smiling,ethnicity,beauty';
var userImgUrl; 

// initialize firebase app
firebase.initializeApp(config);

// firebase auth function 
var auth = firebase.auth();

// firebase storage references 
var storageRef = firebase.storage().ref(); 

// loader function 
function loader (isLoaded) {
    if (!isLoaded) {
        document.getElementById('mainContentDiv').classList = "container faded";
        document.getElementById('loaderDiv').classList = "loader"
    }
    else {
        // put off here later
        document.getElementById('mainContentDiv').classList = "container";
        document.getElementById('loaderDiv').classList = "d-none";
    }
}

// display results function 
// shows image elements returned by APIs
var displayResults = function (personImgUrl, marvelImgUrl) {
    console.log('displayResults');
    console.log(personImgUrl);
    console.log(marvelImgUrl);
    var marvelImgDiv = document.getElementById('marvelDiv');
    var marvelImgTag = document.createElement('img');
    var personImgDiv = document.getElementById('personDiv');
    var personImgTag = document.createElement('img');
    marvelImgTag.src = marvelImgUrl;
    marvelImgTag.classList = "resize";
    personImgTag.src = personImgUrl;
    personImgTag.classList = "resize";
    marvelImgDiv.append(marvelImgTag);
    personImgDiv.append(personImgTag);
    // hide the main image 
    document.getElementById('mainSplashImg').classList = "marveluniverse d-none";
    // kill the loader
    loader(true);

}

// ajax call to face ++ 
function marvelGen(imgData) {
    console.log('marvelGen');
    var detectUrl = "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=" + api_keyFpp + "&api_secret=" + api_secretFpp;
    $.ajax({ // call 
        method: 'POST',
        type: 'POST',
        data: imgData,
        contentType: false,
        url: detectUrl,
        processData: false
    }).then(function (response) {
        console.log(response);
        console.log('The number of faces detected was: ' + response.faces.length);
        var tokenToUse = response.faces[0].face_token;
        console.log(tokenToUse);
        return tokenToUse;
    }, 
    function (err) {
        console.log('There was an error: ' +err);
        // kill the loader, refresh page 
        loader(true);
    }).then(function (tokenToUse) {
        var analyzeUrl = 'https://api-us.faceplusplus.com/facepp/v3/face/analyze?&api_key=' + api_keyFpp + "&api_secret=" + api_secretFpp + '&face_tokens=' + tokenToUse + '&return_attributes=' + attr_returnFpp;
        $.ajax({
            method: 'POST',
            type: 'POST',
            url: analyzeUrl
        }).then(function (response) {
            console.log(response.faces[0].attributes.age.value);
            console.log(response.faces[0].attributes.gender.value);
            console.log(response.faces[0].attributes.ethnicity.value);
            console.log(response.faces[0].attributes.beauty.female_score);
            console.log(response.faces[0].attributes.beauty.male_score);
            var charID = (Math.floor(response.faces[0].attributes.beauty.male_score + response.faces[0].attributes.beauty.female_score) / 2) * 10 + response.faces[0].attributes.age.value;
            console.log(charID)
            localStorage.setItem("CharID", charID);
        },
        function (err) {
            console.log('There was an error: ' + err);
            // kill the loader, refresh page 
            loader(true);
        }).then(function () {
            // this is where the marvel API call goes 
            var apikeyMarvel = '96b65e16cae4310e026174023b8d08b1';
            var timestamp = new Date().getTime();
            var marvelID = localStorage.getItem("CharID");
            var queryURL = "https://gateway.marvel.com:443/v1/public/characters/1009" + marvelID + "?apikey=" + apikeyMarvel + "&ts=" + timestamp;
            console.log(timestamp)
            console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                console.log(response);
                console.log(response.data.results[0].thumbnail.path);
                console.log(response.data.results[0].thumbnail.extension);
                var urlPath = response.data.results[0].thumbnail.path;
                var urlExtension = response.data.results[0].thumbnail.extension;
                var marvelImage = urlPath + "." + urlExtension;
                // var marvelName = response.data.results[0].name;
                // var marvelNameDiv = ("<p>");
                // marvelNameDiv.attr("class" , "name")
                // $("#marvelImg").append(marvelName)
                displayResults(userImgUrl, marvelImage);
            },function (err) {
                console.log('There was an error:');
                console.log(err.responseJSON);
                // kill the loader refresh the page 
                loader(true);
            })
            })}

        )}

function uploadHandler(evt) {
            var files = evt.target.files;
            var file = files[0];
            var data = new FormData();
            // maybe add a loader 
            loader(false);
            // if files exist then load a filereader object, convert to binary string and store result 
            if (files && file) {
                // append the files to the form data
                data.append('image_file', file, file.name);
            }
            var uploadFile = evt.target.files[0];
            console.log(uploadFile.name);
            var uploadTask = storageRef.child('img/' + uploadFile.name).put(uploadFile);
            uploadTask.on('state_changed', null, null, function (snapshot) {
                console.log('Image uploaded successfully');
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                    userImgUrl = downloadURL;
                    console.log('event handler userImgUrl');
                    console.log(userImgUrl);
                    marvelGen(data);
                    

                })
                // we should get and store the firebase storage URL 
                // for the USER's image and store in a global VAR or something (or local storage)

            });

            // call ajax func 
           
        }


if (window.File && window.FileReader && window.FileList && window.Blob) {
        document.getElementById('filePicker').addEventListener('change', uploadHandler, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }




