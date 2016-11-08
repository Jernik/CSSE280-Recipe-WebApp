var profileImg = "images/profile.png";
var friendList = ["John Smith", "Logan Wolverine", "jfkdsf fdsfs", "trtre dsvg", "fdsf", "fsdfsd", "fdsf", "fsdfds", "fdsfds", "fdsfds", "fdsfds", "fdsfds1", "tretefd2", "treqsd", "fdsfds", "yiur"];
var conversation = ["How are you doing", 1, "Just hanging out", 0, "What was that recipe you made last week?", 1, "The oven baked omellete?", 1, "fdsf", 0, "fd", 1, "fdsf", 0, "rewwsa", 1, "yregfd", 0, "wqefds", 0, "rwew", 1, "yutrdfv", 0, "sdfewrs", 0, "wqsc", 1];
var profileId = 0;
// TODO To be changed later
var apiUrl = "https://csse280-contact-back-smithtl.herokuapp.com/contacts";

function displayFriends() {
    for (var i = 0; i < friendList.length; i++) {
        var friend = "<div class='roundbox'>";
        // TODO get picture from ID
        friend += '<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />';
        friend += "<p class = 'name'>" + friendList[i] + "</p> </div>";
        $('.friendblock').append(friend);
    }
}
function displayConversation() {
    for (var i = 0; i < conversation.length; i=i+2) {
        console.log(i);
        console.log(conversation[i+1]);
        if (conversation[i+1] === profileId){
            var message = "<div class='roundbox you'>";
            message += "<p>"+conversation[i]+"</p>"+'<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />';
        } else{
            var message = "<div class='roundbox others'>";
            message += '<img class = "profileImg" src="' + profileImg + '" width=50px height=50px />'+"<p>"+conversation[i]+"</p>";
        }
        message += "</div>";
        $('.messageblock').append(message);
    }
}

displayFriends();
displayConversation();

