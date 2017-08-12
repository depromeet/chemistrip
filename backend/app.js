const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

const app = express();

const mysql = require('mysql');
const db_config = require('./config/db_config.json');
// MySQL 연동
let connectionLimit = 20;
//db connection 몇개 남았는 지 알려줘서 보내는 코드

global.pool = mysql.createPool({
	host : db_config.host,
	port : db_config.port,
	user : db_config.user,
	password : db_config.password,
	database : db_config.database,
	connectionLimit : db_config.connectionLimit
});

let LeftConnections = connectionLimit;
pool.on('acquire', function (connection) {
	LeftConnections--;
	if( LeftConnections < 5 ){
		console.log("DB Connections이 5개 밖에 남지 않았습니다!");
	}
});

pool.on('enqueue', function () {
	console.log("DB Connections이 고갈됨");

});

pool.on('release', function (connection) {
	LeftConnections++;
});

pool.getConnection(function(err, connection) {
	if( err ){
		console.log("error 처리",err);
		return;
	}

	connection.query( 'select 1' , function(err, results) {
		connection.release();
		if (err){
			console.log(err);
			return;
		}
		console.log(results[0]);
	});
});








const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var showExplorer = true;
var options = {
	    validatorUrl : null
};


app.use('/chemistrip/v1/swagger.json', function(req, res) {
		  res.json(swaggerDocument);
});
app.use('/chemistrip/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, showExplorer, options));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/chemistrip/index', index);
app.use('/chemistrip/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
