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

// ajax call to face ++ 
function marvelGen (imgData) {
    var url =  "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=lYJn2ec5zAnhgiO01Q5cMILRDs9laP4I&api_secret=9NCT_mXUokztZLOwk5hUqyLwB5aOLYI-";
    $.ajax({
        method: 'POST',
        type: 'POST',
        data: imgData,
        contentType: false, 
        url: url,
        processData: false 
    }).then(function(response) {
        console.log(response);
    })
    
}

function uploadHandler(evt) {
    var files = evt.target.files;
    var file = files[0];
    var data = new FormData(); 

    // if files exist then load a filereader object, convert to binary string and store result 
    if (files && file) {
        // append the files to the form data
        data.append('image_file', file, file.name);
        console.log(data);

        
    }
    var uploadFile = evt.target.files[0];
    storageRef.child('img/' + uploadFile.name).put(uploadFile).then(
        storageRef.child('img/' + uploadFile.name).getDownloadURL().then(
            function (url) {
                console.log(url);
            }
        )
    )
    // call ajax func 
    marvelGen(data);
}


if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('filePicker').addEventListener('change', uploadHandler, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
}




