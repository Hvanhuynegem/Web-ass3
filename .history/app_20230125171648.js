// initialize dependencies!
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// the body parser is a middleware that parses the body of the request and makes it available in the req.body object of the request.

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Template engine
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({layoutsDir: __dirname + '/views/layouts'}));

// Static files
app.use(express.static('public'));


// Router
app.get('', (req, res) => {
    res.render('home', {layout: 'main'});
});


app.listen(port, () => console.log(`Listening on port ${port}`));




