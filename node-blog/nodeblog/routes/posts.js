var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest:'./public/images'});

var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');


/* show a post */
router.get('/show/:id', function(req, res, next) {
	var posts = db.get('posts');

	posts.findById(req.params.id,function(err, post){
			res.render('show',{
  	             
  	             'post': post
            })
	})
  
});



/* add post route, get the form */
router.get('/add', function(req, res, next) {
	var categories = db.get('categories');

	categories.find({},{},function(err, categories){
			res.render('addpost',{
  	             'title':'Add Post',
  	             'categories': categories
            })
	})
  
});

// we are using multer, include upload...as a parameter and require multer
// in this file
router.post('/add', upload.single('mainimage'), function(req, res, next) {
// get form values

	var title = req.body.title;
	var category = req.body.category;
	var body = req.body.body;
	var author = req.body.author;
	var date = new Date();

	// check if a file is uploaded

	if(req.file){
		var mainimage = req.file.filename
	} else {

		var mainimage = 'noimage.jpg'

	}

	//  Form validations

	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body','Body field is required').notEmpty();

	// check errors

	var errors = req.validationErrors();

	if(errors){
		res.render('addpost',{
			"errors": errors,

		})
	} else {
		var posts = db.get('posts');
		posts.insert({
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"author":author,
			"mainimage":mainimage

		}, function(err,post){
			if(err){
				res.send(err)
			} else {
				req.flash('success', 'Post Added');
				res.location('/');
				res.redirect('/');
			}
		})
	}


});
 
module.exports = router;
