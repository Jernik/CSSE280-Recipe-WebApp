var apiURL = "http://localhost:3000/register";
function registerCheck() {
    var uname = $('#username').val();
    var pass = $('#password').val();
    var check = {};
    check.username = uname;
    check.passwordHash = hashCode(pass); //to be hashed
    $.ajax({
        url: apiURL,
        type: 'POST',
        dataType: 'JSON',
        data: check,
        success: function () {
            console.log("registered");
            window.location.href = "index.html";
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