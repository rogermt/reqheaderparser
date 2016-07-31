var express = require('express')
var app = express();

/* set the port of our application
process.env.PORT lets the port be set by Heroku */
var port = process.env.PORT || 8080;

/* Cluster the APP */
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;





app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});