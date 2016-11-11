apiURL = "https://csse280-recipesocialmedia.herokuapp.com/";

var pictures = [];
var descriptions = [];
var comments = [];
var ids = [];
var i = 0;
var columnTracker = 0;
var columns = ["#leftColumn", "#centerColumn", "#rightColumn"];
var userId = getCookie("login");
var user = '';


function parseRecipes(res) {
    res.forEach(function (e) {
        console.log(e.imageURL);
        pictures.push(e.imageURL);
        descriptions.push(e.name);
        console.log(e.name);
        comments.push("");
        ids.push(e._id);
    })
}

// Function that pulls post from backend
function getPosts() {
    $.ajax({
            url: apiURL + 'recipes',
            type: 'GET',
            success: function (res) {
                parseRecipes(res);
                placePosts();
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        }
    );
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
                    .attr("class", "roundbox").click(function () {
                        document.cookie = document.cookie + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        window.location.href = "index.html";
                        console.log("logging out...")
                    });
                profileBlock.append(logout);
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
    for (var i=0; i < pictures.length; i++) {
        var insertDiv = '<div class="post"id="' + ids[i] + '"> <img src="' + pictures[i] + '">';
        insertDiv += '<p>' + descriptions[i] + '</p>';
        insertDiv += '<p>' + comments[i] + '</p></div>';

        $(columns[columnTracker]).append(insertDiv);
        console.log(columns[columnTracker]);
        columnTracker++;
        if (columnTracker === 3) {
            columnTracker = 0;
        }

        $('#' + ids[i]).on('click', makeClick(i));


    }
}

function makeClick(j){
    return function () {
        console.log(ids[j]);
        window.location.href = "Recipes.html?id=" + ids[j];
    };
}
getPosts();


getUser();

