var profileImg = "images/profile.png";
var email = "abcd@example.com";
var recipeNumber = 5;
//function that places profile picture
function placeImage(){
    $('.roundbox').append('<img id ="profileImg" src="'+profileImg+'" width=200px height=200px />');
}
// function that places profile info
function placeInfo(){
    $('.roundbox').append('<p class="text">Email: '+email+'</p>');
    $('.roundbox').append('<a href="URL ADDED HERE" class="text">Recipes: '+recipeNumber+'</a>');
    $('.roundbox').append('<button id="editButton" > Edit Profile </button>')
}
placeImage();
placeInfo();