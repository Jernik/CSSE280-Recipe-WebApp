var profileImg = "images/profile.png";
var email = "abcd@example.com";
var friendList = [];
var classList = ['.friend0', '.friend1', '.friend2', '.friend3'];
var profileId = "5823d6837332882b20e9e6f1";
// TODO To be changed later
apiURL = "https://csse280-recipesocialmedia.herokuapp.com/";
var userId = getCookie("login");
var user = '';


//function that places profile picture
function placeImage() {
    $('.roundbox').append('<img id ="profileImg" src="' + profileImg + '" width=100px height=100px />');
}
// function that places profile info
function placeInfo() {
    $('.roundbox').append('<p class="text">User: ' + email + '</p>');
}

function displayFriends() {
    var classTracker = 0; //keeping track of columns
    for (var i = 0; i < friendList.length; i++) {
        $(classList[classTracker]).append('<img id ="profileImg" src="' + profileImg + '" width=100px height=100px />');
        $(classList[classTracker]).append('<p class="text">User: ' + friendList[i] + '</p>');
        classTracker++;
        if (classTracker > 3) {
            classTracker = 0;
        }
    }
}
function getFriends() {
    friendList = user.friends;
    var endList = friendList.length - 1; //last index of friend list
    for (var i = 0; i < friendList.length; i++) {
        (function (j, id) {
            console.log("accessing " + apiURL + "profiles/" + id);
            $.ajax({
                url: apiURL + "profiles/" + id,
                type: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    friendList[j] = data.email;
                    if (j === endList) {
                        displayFriends();
                    }
                },
                error: function (request, status, error) {
                    console.log(error, status, request);
                }
            });
        })(i, friendList[i]);
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
            url: apiURL + 'profiles/' + userId,
            type: 'GET',
            success: function (res) {
                console.log(res);
                user = res;
                var profileBlock = $('#profileBlock');
                var link = $("<a></a>").text("You're logged in as " + user.firstName)
                    .attr('href', 'Profile.html')
                    .css("float", "right")
                    .attr("class", "roundbox");
                profileBlock.append(link);
                getFriends();
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        }
    );

}

getUser();
