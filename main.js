// Variables Declaration
var express = require('express');
var ipfilter = require('express-ipfilter').IpFilter;
var IpDeniedError = require('express-ipfilter').IpDeniedError;
var path = require('path');
var payu = require('./server/payu.js');
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );

// Middlewares
app.use( bodyParser.json() ); //for request application/json  
app.use( bodyParser.urlencoded( { extended: false } ) );

// Whitelist the following IPs -> Development - Testing Environments
var ips = [ '35.185.93.165', '35.185.118.219' ];
app.use( ipfilter( ips, { mode: 'allow' } ) );

// Error handler
app.use( function(err, req, res, _next ) {
  if( err instanceof IpDeniedError ){
    res.status(401);
  }else{
    res.status( err.status || 500 );
  }
  err.name = 'Error. IP Address Not authorized';
  res.send( err );
});

// Get view root project and exec request o response
app.get( '/', function( req, res ){
  res.send( 'Iurest Isolated' );
});

// Get PayU keys Information
app.get( '/api/getCusPayInfo', function( req, res ){
  res.status(200).jsonp( payu.getKeys() );
});

// Allows 9000 port
app.listen( 9000 );