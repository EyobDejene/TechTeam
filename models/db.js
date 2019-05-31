// Bring Mongoose into the app
let mongoose = require( 'mongoose' );

// Build the connection string
// var dbURI = 'mongodb://localhost/ConnectionTest';
const server   = process.env.DB_SERVER;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;


var dbURI = `mongodb+srv://${username}:${password}@${server}/${database}?retryWrites=true`;


// source :
//https://theholmesoffice.com/mongoose-connection-best-practice/

// Create the database connection
mongoose.connect(dbURI, { useNewUrlParser: true,useCreateIndex: true});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});


// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS // For example
require('./users.model');
require('./overview.model');