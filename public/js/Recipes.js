var foodImg = "images/ovenbakedomelet.jpg";
var author = "Tester";
var name = "";
var ingredients = [];
var description = "";
var instructions = [];
var recipeId = 0;
// TODO To be changed later
apiURL = "https://csse280-recipesocialmedia.herokuapp.com/";
var userId = getCookie("login");
var user = '';


recipeId = qs('id');

function processRecipe(res) {
    ingredients = res.ingredients.map(function (elem) {
        return " " + elem.name;
    });
    description = res.descriptions;
    instructions = res.steps.map(function (elem) {
        //our backend is being weird here, so this stitches the string back together
        var array = $.map(elem, function (value, index) {
            return [value];
        });
        var temp = "";
        for (var i = 0; i < array.length; i++) {
            temp += array[i];
        }
        return temp;
    });
    name = res.name;
}


function getRecipeInfo() {
    $.ajax({
            url: apiURL + 'recipes/' + recipeId,
            type: 'GET',
            success: function (res) {
                console.log(res);
                processRecipe(res);
                addRecipeInfo();
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        }
    );
}

function addRecipeInfo() {
    var header = '<img id ="foodImg" src="' + foodImg + '" width=200px height=200px />';
    header += "<p id='recipe'>" + name + "</p>";
    header += "<p id='author'>" + "By: " + author + "</p>";
    header += "<p>" + description + "</p>";
    $('#header').append(header);
    var ingredientsList = "<ul id='ingredients'>";
    for (var i = 0; i < ingredients.length; i++) {
        ingredientsList += "<li>" + ingredients[i] + "</li>";
    }
    ingredientsList += "</ul>";
    $('#ingredients').append(ingredientsList);
    var instructionsList = "<ol id='ingredients'>";
    for (var i = 0; i < instructions.length; i++) {
        instructionsList += "<li>" + instructions[i] + "</li>";
    }
    instructionsList += "</ol>";
    $('#instructions').append(instructionsList);
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
                getRecipeInfo();
            },
            error: function (request, status, error) {
                console.log(error, status, request);
            }
        }
    );

}

//From http://stackoverflow.com/a/7732379
function qs(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

getUser();

