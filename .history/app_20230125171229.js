// initialize dependencies!
import express from 'express';
import { engine } from 'express-handlebars';
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


// Static files
app.use(express.static('public'));

// Template engine
app.engine('hbs', engine());
app.set('view engine', 'hbs');
app.set('views', './views');

// Router
app.get('', (req, res) => {
    res.render('home');
});


app.listen(port, () => console.log(`Listening on port ${port}`));




