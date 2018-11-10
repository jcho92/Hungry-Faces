// Configure Firebase
var config = {
    apiKey: "AIzaSyA9l_Xn-60I1ullS7D3MwKxPFFHDmsibso",
    authDomain: "marvelherogenerator.firebaseapp.com",
    databaseURL: "https://marvelherogenerator.firebaseio.com",
    projectId: "marvelherogenerator",
    storageBucket: "gs://marvelherogenerator.appspot.com",
    messagingSenderId: "317800982498"
};

// initialize firebase app
firebase.initializeApp(config);

// firebase auth function 
var auth = firebase.auth();

// firebase storage references 
var storageRef = firebase.storage().ref();

// event handler function 
// invoked after a change to the file selection 
// only selects the first file selected by the user 

function uploadHandler(evt) {
    var files = evt.target.files;
    var file = files[0];

    // if files exist then load a filereader object, convert to binary string and store result 
    if (files && file) {
        var reader = new FileReader();
        // nested function that reads and converts file after the filereader is done loading (onload)
        reader.onload = function (readerEvt) {
            var binaryString = readerEvt.target.result;
            console.log(btoa(binaryString));
        };
        reader.readAsBinaryString(file);
        // call a function that initiates ajax call
    }
    var uploadFile = evt.target.files[0];
    storageRef.child('img/' + uploadFile.name).put(uploadFile).then(
        storageRef.child('img/' + uploadFile.name).getDownloadURL().then(
            function (url) {
                console.log(url);
            }
        )
    )
}


if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('filePicker').addEventListener('change', uploadHandler, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
}




