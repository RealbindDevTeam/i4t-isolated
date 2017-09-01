// Declaración de variables
var express = require('express');
var app = express();
var payu = require('./server/payu.js');
const bodyParser = require('body-parser');

// Middlewares
app.use( bodyParser.json() ); //for request application/json  
app.use( bodyParser.urlencoded( { extended: false } ) );

// Obtiene la vista root del proyecto y ejecuta request o response
app.get( '/', function( req, res ){
    res.send( 'Iurest Isolated' );
});

// Retorna la informacion de las llaves de PayU
app.get( '/api/getCusPayInfo', function( req, res ){
    res.status(200).jsonp( payu.getKeys() );
});

//Habilitacion de puerto 9000
app.listen( 9000 );