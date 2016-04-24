var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var crontab = require("crontab");
var jquery = require("jquery");
var html = require("html");
var Twig = require("twig");
var app = express();
app.use("/css", express.static(path.join(__dirname, '/css')));
app.use("/js", express.static(path.join(__dirname, '/js')));
app.use("/fonts", express.static(path.join(__dirname, '/fonts')));
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));
app.use(cookieParser());


app.get('/', function (req, res) {
    var cronjobs;
    crontab.load(function (err, crontab) {
        cronjobs = crontab.jobs();
        res.render('index.twig', {
            jobs: cronjobs
        });
    });

});



//app.get('/', function(request, response){
//    crontab.load(function(err, crontab){
//    var jobs = crontab.jobs();
//  //  console.log(jobs[1].to);
//    });
//	response.render("index.html");
//});

app.get('/new', function (request, response) {

    response.sendfile("new.html");
});

app.post('/new', urlencodedParser, function (request, response) {

    if (request.body.command == null) {
        console.log('command is empty');
    } else {
        var cron_command = request.body.cron_expr + " " + request.body.command;
        console.log(cron_command);
        crontab.load(function (err, crontab) {
            crontab.create(request.body.command, request.body.cron_expr);
            crontab.save(function (err, crontab) {
                console.log(err);
            });
        })
    }
    response.sendfile("new.html");
});

app.listen(8081);