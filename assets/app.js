// Initialize Firebase
var config = {
    apiKey: "AIzaSyA9l_Xn-60I1ullS7D3MwKxPFFHDmsibso",
    authDomain: "marvelherogenerator.firebaseapp.com",
    databaseURL: "https://marvelherogenerator.firebaseio.com",
    projectId: "marvelherogenerator",
    storageBucket: "gs://marvelherogenerator.appspot.com",
    messagingSenderId: "317800982498"
};
firebase.initializeApp(config);
// firebase auth 
var auth = firebase.auth();
// firebase storage 
// Create a root reference
var storageRef = firebase.storage().ref();
var imageFile;
var imageForUpload;
var imageforFPP;
// upload function 
function uploadHandler(e) {
    var uploadFile = e.target.files[0];
    storageRef.child('img/' + uploadFile.name).put(uploadFile).then(
        storageRef.child('img/' + uploadFile.name).getDownloadURL().then(
            function(url) {
                console.log(url);
        // `url` is the download URL for 'images/stars.jpg'
      
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        var myData; 
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
           var blob = xhr.response;
           myData = xhr.response;  
           console.log(blob); 
        };
        xhr.open('GET', url);
        xhr.send();
        console.log(myData);
      }).then(function(t) {
          console.log(t);
      }))};

    window.onload = function () {
            document.getElementById('userImage').addEventListener('change', uploadHandler)
        }

        

    
