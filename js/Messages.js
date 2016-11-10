var profileImg = "images/profile.png";
var friendList = [];
var conversation = ["How are you doing", 1, "Just hanging out", 0, "What was that recipe you made last week?", 1, "The oven baked omellete?", 1, "fdsf", 0, "fd", 1, "fdsf", 0, "rewwsa", 1, "yregfd", 0, "wqefds", 0, "rwew", 1, "yutrdfv", 0, "sdfewrs", 0, "wqsc", 1];
var profileId = "5823d6837332882b20e9e6f1";
var conversationId = "";
// TODO To be changed later
var apiURL = "http://localhost:3000/";

// Function for displaying friends list
function displayFriends() {
    console.log(friendList.length);
    for (var i = 0; i < friendList.length; i++) {
        var friend = "<div class='roundbox'>";
        // TODO get picture from ID
        friend += '<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />';
        friend += "<p class = 'name'>" + friendList[i] + "</p> </div>";
        $('.friendblock').append(friend);
    }
}
// Function for displaying the conversation
function displayConversation() {
    for (var i = 0; i < conversation.length; i = i + 2) {
        if (conversation[i + 1] === profileId) {
            var message = "<div class='roundbox you'>";
            message += "<p>" + conversation[i] + "</p>" + '<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />';
        } else {
            var message = "<div class='roundbox others'>";
            message += '<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />' + "<p>" + conversation[i] + "</p>";
        }
        message += "</div>";
        $('.messageblock').append(message);
    }
    $('.message').append('<form class="form roundbox"><input class="box roundbox" type="test"><input class="button roundbox" type="submit"></form>');
    $('.form').submit(function(e) {
        e.preventDefault();
        sendMessage();
    });
}
function sendMessage() {
    var message = $('.box').val();
    console.log(message);
    // Doesn't send message if empty'
    if (message !== '') {
        $.ajax({
            url: apiURL,
            type: 'POST',
            dataType: 'JSON',
            data: message,
            success: function() {
                location.reload();
                /*sessionStorage.setItem("contactToUpdate", contactToUpdateString);*/
            },
            error: function(request, status, error) {
                console.log(error, status, request);
            }

        });
    }
}
function getFriends() {
    $.ajax({
        url: apiURL + "profiles/" + profileId,
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
            friendList = data.friends;
            var endList = friendList.length - 1; //last index of friend list
            for (var i = 0; i < friendList.length; i++) {
                (function(j, id) {
                    $.ajax({
                        url: apiURL + "profiles/" + id,
                        type: 'GET',
                        dataType: 'JSON',
                        success: function(data) {
                            friendList[j] = data.firstName + " " + data.lastName;
                            if (j === endList) {
                                displayFriends();
                            }
                        },
                        error: function(request, status, error) {
                            console.log(error, status, request);
                        }
                    });
                })(i, friendList[i]);
            }
        },
        error: function(request, status, error) {
            console.log(error, status, request);
        }
    });
}

getFriends();
displayConversation();

