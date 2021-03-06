var profileImg = "images/profile.png";
var email = "abcd@example.com";
var friendList = [];
var classList = ['.friend0', '.friend1', '.friend2', '.friend3'];
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
    console.log("in display friends:");
    console.log(user, friendList);
    var classTracker = 0; //keeping track of columns
    for (var i = 0; i < friendList.length; i++) {
        $(classList[classTracker]).append('<img id ="profileImg" src="' + profileImg + '" width=100px height=100px />');
        $(classList[classTracker]).append('<p class="text">User: ' + friendList[i].firstName + '</p>');
        classTracker++;
        if (classTracker > 3) {
            classTracker = 0;
        }
    }
}
function getFriends() {
    friendList = user.friends;
    console.log("friends are:");
    console.log(friendList);
    var endList = friendList.length - 1; //last index of friend list
    for (var i = 0; i < friendList.length; i++) {
        (function (j, id) {
            console.log("accessing " + apiURL + "profiles/" + id);
            $.ajax({
                url: apiURL + "profiles/" + id,
                type: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    console.log(data);
                    friendList[j] = data;
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
    var c_end;
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
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
    console.log("accessing: " + apiURL +'profiles/'+ userId);
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
                var logout = $("<button></button>").text("Log out")
                    .attr('href', 'Profile.html')
                    .css("float", "right")
                    .attr("class", "roundbox").click(function(){
                        document.cookie = document.cookie+'=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        window.location.href = "index.html";
                        console.log("logging out...")
                    });
                profileBlock.append(logout);
                profileBlock.append(link);
                console.log("Before getFriends:");
                console.log(user);
                getFriends();
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        }
    );

}

getUser();
