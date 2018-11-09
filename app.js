// Initialize Firebase
var config = {
    apiKey: "AIzaSyA9l_Xn-60I1ullS7D3MwKxPFFHDmsibso",
    authDomain: "marvelherogenerator.firebaseapp.com",
    databaseURL: "https://marvelherogenerator.firebaseio.com",
    projectId: "marvelherogenerator",
    storageBucket: "",
    messagingSenderId: "317800982498"
};
firebase.initializeApp(config);

// firebase storage 
const storage = firebase()


var imageURL = "https://raw.githubusercontent.com/jcho92/Hungry-Faces/master/WhatsApp%20Image%202018-11-04%20at%207.42.57%20PM.jpeg"
$.ajax({
    url: "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=lYJn2ec5zAnhgiO01Q5cMILRDs9laP4I&api_secret=9NCT_mXUokztZLOwk5hUqyLwB5aOLYI-&image_url=" + imageURL,
    type: "POST"
}).then(function (response) {
    console.log(response.faces[0].face_token)
    var face_token = response.faces[0].face_token;
    console.log(face_token)
    $.ajax({
        url: "https://api-us.faceplusplus.com/facepp/v3/face/analyze?api_key=lYJn2ec5zAnhgiO01Q5cMILRDs9laP4I&api_secret=9NCT_mXUokztZLOwk5hUqyLwB5aOLYI-&face_tokens=" + face_token + "&return_attributes=gender,age,smiling,ethnicity",
        type: "POST"
    }).then(function (response) {
        console.log(response);
        console.log(response.faces[0].attributes.age.value);
        console.log(response.faces[0].attributes.gender.value);
        console.log(response.faces[0].attributes.ethnicity.value);
    })


});
