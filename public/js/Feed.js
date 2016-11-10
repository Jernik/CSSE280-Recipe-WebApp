apiURL = "https://csse280-recipesocialmedia.herokuapp.com/profiles/";

var pictures = [];
var descriptions = [];
var comments = [];
var i = 0;
var columnTracker = 0;
var columns = ["#leftColumn", "#centerColumn", "#rightColumn"];
var userId = getCookie("login");
var user = '';

// Function that pulls post from backend
function getPosts() {
    pictures.push("images/burlyBurger.jpg");
    pictures.push("images/smokyChipotleMacAndCheese.jpg");
    pictures.push("images/spencePestoChickenPasta.jpg");
    descriptions.push("The maniliest burger");
    descriptions.push("mmm mac and cheese");
    descriptions.push("My favorite dish");
    comments.push("threjkwe");
    comments.push("jtlkrejtlkret");
    comments.push("jrewjrlkewr");
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
            url: apiURL + userId,
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
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        }
    );

}

//function that places posts
function placePosts() {
    for (i; i < pictures.length; i++) {
        var insertDiv = '<div class="post"> <img src="' + pictures[i] + '" alt="">';
        insertDiv += '<p>' + descriptions[i] + '</p>';
        insertDiv += '<p>' + comments[i] + '</p></div>';
        $(columns[columnTracker]).append(insertDiv);
        if (columnTracker === 2) {
            columnTracker = 0;
        }
        columnTracker++;
    }
}
getPosts();
placePosts();

getUser();

