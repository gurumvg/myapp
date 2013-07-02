var express = require('express');
var app = express();

// specifying path for static content
// http://blog.modulus.io/nodejs-and-express-static-content
app.use(express.static(__dirname + '/src'));

app.listen(3000);
console.log('Listening on port 3000');