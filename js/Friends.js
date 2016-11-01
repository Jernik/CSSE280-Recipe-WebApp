/**
 * Created by lukezhang on 11/1/16.
 */
var profileImg = "images/profile.png";
var email = "abcd@example.com";

//function that places profile picture
function placeImage(){
    $('.roundbox').append('<img id ="profileImg" src="'+profileImg+'" width=100px height=100px />');
}
// function that places profile info
function placeInfo(){
    $('.roundbox').append('<p class="text">User: '+email+'</p>');
}
placeImage();
placeInfo();