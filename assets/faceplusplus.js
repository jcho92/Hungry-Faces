var imageURL = "https://raw.githubusercontent.com/jcho92/Hungry-Faces/master/WhatsApp%20Image%202018-09-03%20at%207.16.51%20PM.jpeg"
$.ajax({
    url: "https://api-us.faceplusplus.com/facepp/v3/detect?api_key=lYJn2ec5zAnhgiO01Q5cMILRDs9laP4I&api_secret=9NCT_mXUokztZLOwk5hUqyLwB5aOLYI-&image_url=" + imageURL,
    type: "POST"
}).then(function (response) {
    console.log(response.faces)
    var face_token=response.faces[0].face_token;
    console.log(face_token)
    $.ajax({
        url: "https://api-us.faceplusplus.com/facepp/v3/face/analyze?api_key=lYJn2ec5zAnhgiO01Q5cMILRDs9laP4I&api_secret=9NCT_mXUokztZLOwk5hUqyLwB5aOLYI-&face_tokens=" + face_token + "&return_attributes=gender,age,smiling,ethnicity",
        type: "POST"
    }).then(function(response){
        console.log(response);
        console.log(response.faces[0].attributes.age.value);
        console.log(response.faces[0].attributes.gender.value);
        console.log(response.faces[0].attributes.ethnicity.value);
    })


});