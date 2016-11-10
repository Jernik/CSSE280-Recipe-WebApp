var express = require('express');
var path = require('path');
var app = express();


// use static middleware to serve files from public directory.
app.use(express.static(path.join(__dirname, 'public')));


var port = process.env.PORT || 3500;
app.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
});
