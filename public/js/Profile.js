var profileImg = "images/profile.png";
var email = "abcd@example.com";
var recipeNumber = 5;
var profileId = 0;
// TODO To be changed later
apiURL = "https://csse280-recipesocialmedia.herokuapp.com/";
var userId = getCookie("login");
var user = '';
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

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function getUser() {
    console.log("accessing: " + apiURL + userId);
    $.ajax({
            url: apiURL +'profiles/' +userId,
            type: 'GET',
            success: function (res) {
                console.log(res);
                user = res;
                var profileBlock = $('#profileBlock');
                var link = $("<a></a>").text("You're logged in as " + user.firstName)
                    .attr('href', 'Profile.html')
                    .css("float", "right")
                    .attr("class","roundbox");
                profileBlock.append(link);
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        }
    );

}

getUser();
placeImage();
placeInfo();

// adding friend to your friends list
function addFriend() {
    // TODO get friend list and add friend to list
    $.ajax({
        url: apiURL+profile._id,
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