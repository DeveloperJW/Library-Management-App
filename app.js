const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;//set PORT for local dev and deployment

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//
app.use(cookieParser());

//set up static route and use express.static method to sever the static files located in the public folder
app.use('/static', express.static('public'));
// view engine setup
app.set('view engine', 'pug');

//set up routers
const mainRoutes = require('./routes');
const booksRoutes=require('./routes/books');

app.use(mainRoutes);
app.use('/books', booksRoutes);

app.listen(port, () => {
  console.log("The application is running on localhost:" + port);
});

module.exports= app;