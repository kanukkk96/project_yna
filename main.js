var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var engines = require('consolidate');
var logger = require('morgan');
var path = require("path");
var cookieParser = require('cookie-parser');

const multer = require('multer');
const upload = multer({dest: './upload'})

// router 설정
var dashBoardRouter = require('./dist/routes/dashboard.js');
var diaryRouter = require('./dist/routes/diary.js');
var userRouter = require('./dist/routes/user.js');
var foodRouter = require('./dist/routes/food.js');
var boardRouter = require('./dist/routes/board.js');
var goalRouter = require('./dist/routes/goal.js');
var loveRouter = require('./dist/routes/love.js');
var rankRouter = require('./dist/routes/rank.js');
var page1_1Router = require('./dist/routes/page1_1.js');
var page1_2Router = require('./dist/routes/page1_2.js');
var page1_3Router = require('./dist/routes/page1_3.js');
var page1_4Router = require('./dist/routes/page1_4.js');
var page2_1Router = require('./dist/routes/page2_1.js');
var page2_2Router = require('./dist/routes/page2_2.js');
var page2_3Router = require('./dist/routes/page2_3.js');
var page3Router = require('./dist/routes/page3.js');


app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view 경로 설정
app.set('views', __dirname + '/dist');
app.set('js', __dirname + '/dist/js');

// 화면 engine을 html로 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// app.engine('html', engines.mustache);
// app.set('view engine', 'html');

// 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
// app.use(express.static(__dirname + '/dist/css'));
// app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('dist'));
app.use('/Profile', express.static('./upload'));

app.use('/dashboard', dashBoardRouter);
app.use('/diary', diaryRouter);
app.use('/user', userRouter); 
app.use('/food', foodRouter);
app.use('/board', boardRouter);
app.use('/goal', goalRouter);
app.use('/love', loveRouter);
app.use('/rank', rankRouter);
app.use('/page1_1',page1_1Router);
app.use('/page1_2',page1_2Router);
app.use('/page1_3',page1_3Router);
app.use('/page1_4',page1_4Router);
app.use('/page2_1',page2_1Router);
app.use('/page2_2',page2_2Router);
app.use('/page2_3',page2_3Router);
app.use('/page3',page3Router);

module.exports = app;

var port = 4000;
var hostname = '192.168.0.137';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");

  res.render('views/user/login.html');

  next();
});

http.createServer(app).listen(port, hostname, function() {
  console.log("server on! " + hostname)
})