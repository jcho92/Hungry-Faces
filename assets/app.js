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
    storageRef.child('img/' + uploadFile.name).put(uploadFile).then(function (data) {
        console.log(data.totalBytes);
        data.ref.getDownloadURL().then(function (url) {
            $.ajax({
                url: 
            })
        }).then(function (result1) {
            alert(result1);
            return 'hello'
        }).then(function (result2) {
            alert(result2);
            return 'hi'
        }).then(function (result3) {
            alert(result3);
        })
    })
}

    window.onload = function () {
            document.getElementById('userImage').addEventListener('change', uploadHandler)
        }

    
