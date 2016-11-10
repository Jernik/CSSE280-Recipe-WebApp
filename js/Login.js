var apiURL = "http://127.0.0.1:3000/login";
function checkLogin() {
    var uname = $('#username').val();
    var pass = $('#password').val();
    console.log(uname);
    console.log(pass);
    var check = {};
    check.username = uname;
    check.passwordHash = hashCode(pass); //to be hashed
    $.ajax({
        url: apiURL,
        type: 'POST',
        dataType: 'JSON',
        data: check,
        success: function () {
            var id = document.cookie;
            console.log(id);
            window.location.href = "Feed.html";
            /*sessionStorage.setItem("contactToUpdate", contactToUpdateString);*/
        },
        error: function (request, status, error) {
            alert('Username and Password do not match, please try again');
            console.log(error, status, request);
        }
    });
}

$('.login').click(function (e) {
    e.preventDefault(); // Prevent querystring from showing up in address bar
    checkLogin();
});
$('.register').click(function (e) {
    e.preventDefault(); // Prevent querystring from showing up in address bar
    window.location.href = "register.html";
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