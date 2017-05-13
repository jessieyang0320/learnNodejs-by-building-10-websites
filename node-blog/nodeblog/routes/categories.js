var express = require('express');
var router = express.Router();

// var multer = require('multer');
// var upload = multer({dest:'./uploads'});

var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/* add post route, get the form */
router.get('/add', function(req, res, next) {
	
			res.render('addcategory',{
  	             'title':'Add Category'
  	             
            
	})
  
});

// we are using multer, include upload...as a parameter and require multer
// in this file
router.post('/add', function(req, res, next) {
// get form values

	var name = req.body.name;
	

	

	//  Form validations

	req.checkBody('name','Name field is required').notEmpty();
	
	// check errors

	var errors = req.validationErrors();

	if(errors){
		res.render('addcategory',{
			"errors": errors,

		})
	} else {
		var categories = db.get('categories');
		categories.insert({
			"name": name

		}, function(err,post){
			if(err){
				res.send(err)
			} else {
				req.flash('success', 'Category Added');
				res.location('/');
				res.redirect('/');
			}
		})
	}


});
 
module.exports = router;
