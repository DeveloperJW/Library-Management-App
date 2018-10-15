const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


//set up static route and use express.static method to sever the static files located in the public folder
app.use('/static', express.static('public'))
// view engine setup
app.set('view engine', 'pug')

//set up routers
const mainRoutes = require('./routes')
const booksRoutes = require('./routes/books')

app.use(mainRoutes)
app.use('/books', booksRoutes)

/* Catch 404 Not Found error */
app.use((req, res, next) => {
  const err = new Error('Page Not Found')
  err.status = 404
  next(err)
})

/* add if statement to check if err occurs */
app.use((err, req, res, next) => {
  if (err) {
    res.locals.error = err
    res.status(err.status || 500)
    res.render('error', {error: err})
    next(err)
  }
})

module.exports = app;