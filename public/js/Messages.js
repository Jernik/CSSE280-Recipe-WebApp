var profileImg = "images/profile.png";
var friendList = [];
var friendIds = [];
var conversation = [];
var messages = [];
var conversationId = "";
// TODO To be changed later
apiURL = "https://csse280-recipesocialmedia.herokuapp.com/";
var userId = getCookie("login");
var user = '';

// Function for displaying friends list
function displayFriends() {
    for (var i = 0; i < friendList.length; i++) {
        var friend = "<div class='friendbox roundbox'>";
        // TODO get picture from ID
        friend += '<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />';
        friend += "<p class = 'name'>" + friendList[i] + "</p> </div>";
        $('.friendblock').append(friend);
    }
    $('.name').click(function(){
        var friend;
        for (var i = 0; i < friendList.length; i++) {
            if ($(this).text() === friendList[i]){
                friend = friendIds[i];
                break;
            }
        }
        getConversation(friend);
    });
}
// Function for displaying the conversation
function displayConversation() {
    console.log("hello");
    for (var i = 0; i < conversation.length; i = i++) {
        $.ajax({
            url: apiURL+"messages/"+conversation[i],
            type: 'GET',
            dataType: 'JSON',
            success: function(res) {
                messages[i] = res;
                if (messages[i].author === userId) {
                    var message = "<div class='roundbox you'>";
                    message += "<p>" + messages[i] + "</p>" + '<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />';
                } else {
                    var message = "<div class='roundbox others'>";
                    message += '<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />' + "<p>" + messages[i] + "</p>";
                }
                message += "</div>";
                $('.messageblock').append(message);
            },
            error: function(request, status, error) {
                console.log(error, status, request);
            }

        });
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
    friendList = user.friends;
    console.log(friendList);
    var endList = friendList.length - 1; //last index of friend list
    for (var i = 0; i < friendList.length; i++) {
        (function (j, id) {
            $.ajax({
                url: apiURL + "profiles/" + id,
                type: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    friendList[j] = data.firstName + " " +data.lastName;
                    friendIds[j] = data._id;
                    if (j === endList) {
                        displayFriends();
                        console.log(friendIds);
                        getConversation(friendIds[3]);
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
function getConversation(friendId){
    console.log(friendId);
    console.log(apiURL +'conversation/' +user._id.toString()+"-"+friendId.toString())
    $.ajax({
            url: apiURL +'conversation/' +user._id.toString()+"-"+friendId.toString(),
            type: 'GET',
            success: function (res) {
                conversation = res.messages;
                if (conversation === undefined){
                    console.log("few");
                } else{
                    console.log("few");
                    displayConversation();
                }
            },
            error: function (request, status, error) {
                console.log("few");
                console.log(error, status, request);
            }
        }
    );
}

function getUser() {
    console.log("accessing: " + apiURL +'profiles/' +userId);
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
                getFriends();
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        }
    );

}

getUser();

