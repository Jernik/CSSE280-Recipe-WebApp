var profileImg = "images/profile.png";
var email = "abcd@example.com";
var recipeNumber = 5;
var profileId = 0;
//function that places profile picture
function placeImage(){
    $('.roundbox').append('<img id ="profileImg" src="'+profileImg+'" width=200px height=200px />');
}
// function that places profile info
function placeInfo(){
    $('.roundbox').append('<p class="text">Email: '+email+'</p>');
    $('.roundbox').append('<a href="URL ADDED HERE" class="text">Recipes: '+recipeNumber+'</a>');
    //If profile is logged in profile then display edit profile else show add friend
    if (profileId === 1){
        $('.roundbox').append('<button class="Button" > Edit Profile </button>');
    } else{
        // check if friend and if so show remove friend
        $('.roundbox').append('<button class="Button" > Add Friend </button>');
    }
}
placeImage();
placeInfo();