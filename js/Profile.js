var profileImg = "images/profile.png";
var email = "abcd@example.com";
var recipeNumber = 5;
var profileId = 0;
// TODO To be changed later
var apiUrl = "https://csse280-contact-back-smithtl.herokuapp.com/contacts";
//function that places profile picture
function placeImage(){
    $('.roundbox').append('<img id ="profileImg" src="'+profileImg+'" width=200px height=200px />');
}
// function that places profile info
function placeInfo(){
    $('.roundbox').append('<p class="text">Email: '+email+'</p>');
    $('.roundbox').append('<a href="URL ADDED HERE" class="text">Recipes: '+recipeNumber+'</a>');
    // TODO If profile is logged in profile then display edit profile else show add friend
    if (profileId === 1){
        $('.roundbox').append('<button class="Button" > Edit Profile </button>');
    } else{
        // TODO check if friend and if so show remove friend
        $('.roundbox').append('<button class="Button" onClick=addFriend()> Add Friend </button>');
    }
}
placeImage();
placeInfo();

// adding friend to your friends list
function addFriend() {
    // TODO get friend list and add friend to list
    $.ajax({
        url: apiUrl+profile._id,
        type: 'PUT',
        dataType: 'JSON',
        data: profile,
        success: function (data) {
            console.log("Updated contact");
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    });
}