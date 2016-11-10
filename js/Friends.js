
var profileImg = "images/profile.png";
var email = "abcd@example.com";
var friendList = [];
var classList = ['.friend0', '.friend1', '.friend2', '.friend3'];
var profileId = "5823d6837332882b20e9e6f1";
// TODO To be changed later
var apiURL = "http://localhost:3000/";

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
    $.ajax({
        url: apiURL + "profiles/" + profileId,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            friendList = data.friends;
            var endList = friendList.length - 1; //last index of friend list
            for (var i = 0; i < friendList.length; i++) {
                (function (j, id) {
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
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    });
}
getFriends();