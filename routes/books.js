const express = require('express');
const router = express.Router();
const models=require('../models');

/* GET books page. */
router.get('/', function(req, res, next) {
  models.Books.findAll({order: [["title", "ASC"]]}).then(function(books){
    res.render("index", {books: books, title: "The Book Lists" });
  }).catch(function(error){
    // res.render('error',{error:error})
    res.send(500, error);

  });
});

/* Create a form for inserting a new book. */
router.get('/new', function(req, res, next) {
  res.render("new-book", {books: {}, title: "New Book"});
});

/* POST create book. */
router.post('/new', function(req, res, next) {
  models.Books.create(req.body).then(function(books) {
    res.redirect("/books/" + books.id);
  }).catch(function(error){
    if(error.name === "SequelizeValidationError") {
      res.render("new-book", {books: models.Books.build(req.body), errors: error.errors, title: "New Book"})
    } else {
      throw error;
    }
  }).catch(function(error){
    res.send(500, error);
  });
});

/* GET individual book. Also, we can edit details on this page. */
router.get("/:id", function(req, res, next){
  models.Books.findById(req.params.id).then(function(books){
    if(books) {
      res.render("update-book", {books:books, title: "Update Book"});
    } else {
      // res.send(404);
      const err = new Error('Page Not Found');
      err.status=404;
      res.render('error',{error:err})
    }
  }).catch(function(error){
    res.send(500, error);
  });
});

/* PUT update article. */
router.post("/:id", function(req, res, next){
  models.Books.findById(req.params.id).then(function(books){
    if (books) {
      return books.update(req.body);
    } else {
      res.send(404);
    }
  }).then(function(books){
    res.redirect("/books/" + books.id);
  });
});

/* DELETE a book from database. */
router.post("/:id/delete", function(req, res, next){
  models.Books.findById(req.params.id).then(function(books){
    if(books) {
      return books.destroy();
    } else {
      res.send(404);
    }
  }).then(function(){
    res.redirect("/books");
  }).catch(function(error){
    res.send(500, error);
  });
});

module.exports = router;
