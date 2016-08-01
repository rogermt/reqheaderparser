var express = require('express')
var app = express();

/* set the port of our application
process.env.PORT lets the port be set by Heroku */
var port = process.env.PORT || 8080;

/* Cluster the APP */
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;


var getHeaders = function(ipAddress, language, software){
    return{
        ipaddress: ipAddress || null,
        language:  language || null,
        software: software || null
    }
}

/* API return the IP address, language and operating system
   of the client browser 
   1. req.connection.remoteAddress for IP Address
   2. req.headers["accept-language"] for Language
   3. req.headers['user-agent']) for Software
*/
app.get('/api/whoami', function(req, res) {
    res.json(getHeaders( req.headers['x-forwarded-for'] || req.connection.remoteAddress
                           ,(req.headers["accept-language"]).toString().split(',')[0]  
                           ,/\([^)]*\)/.exec(req.headers['user-agent'])[0].slice(1,-1)  ))
})

app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
})