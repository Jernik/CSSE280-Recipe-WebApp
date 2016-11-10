apiURL = "https://csse280-recipesocialmedia.herokuapp.com/register";
function registerCheck() {
    var uname = $('#username').val();
    var pass = $('#password').val();
    var name = $('#name').val();
    var check = {};
    check.username = uname;
    check.passwordHash = hashCode(pass); //to be hashed
    check.firstName = name;
    $.ajax({
        url: apiURL,
        type: 'POST',
        dataType: 'JSON',
        data: check,
        success: function () {
            console.log("registered");
            window.location.href = "Feed.html";
            /*sessionStorage.setItem("contactToUpdate", contactToUpdateString);*/
        },
        error: function (request, status, error) {
            console.log(error, status, request);
        }
    });
}

$('.register').click(function (e) {
    e.preventDefault(); // Prevent querystring from showing up in address bar
    registerCheck();
});

function hashCode (str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}