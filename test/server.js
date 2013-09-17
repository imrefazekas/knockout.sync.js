var connect = require('connect');
var http = require('http');

var io = require('socket.io');

var funcsync = require('funcsync');
var vindication = require('vindication.js');

var model = require('./model');
var dataModel = funcsync.stringify( model );

var connectApp = connect();
connectApp.use( connect.static('test/www') );
var server = http.createServer( connectApp );
var ioServer = io.listen( server );
server.listen( 8080 );

var socketNamespace = '/ko';

var iosocket = ioServer.of( socketNamespace );

iosocket.on('connection', function (socket) {
	iosocket.emit('updateModel', dataModel );

	socket.on('share', function (data) {
		data.timestamp = Date.now();
		iosocket.emit( 'updateData', data );
	} );
} );
