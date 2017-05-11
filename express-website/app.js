var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// set up css folder
app.use(express.static(path.join(__dirname, 'public')));


// create routes

app.get('/',function(req,res){
	res.render('index',{'title': 'Welcome'});
})

app.get('/about',function(req,res){
	res.render('about');
})

app.get('/contact',function(req,res){
	res.render('contact');
})

app.post('/contact/send',function(req,res){
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'jessie.yang0320@gmail.com',
			pass: ''
		}
	});

	var mailOptions = {
		from: 'Jessie <jessie.yang0320@gmail.com>',
		to: 'jessie.yang0320@gmail.com',
		subject: 'Website submission',
		text: 'You have a submission of following details: Name:'+req.body.name+'Email:'+req.body.email+'Message: '+req.body.message,
		html: '<p>You have a submission of following details: </p>'

	};
	transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        res.redirect('/');
    } else {
    	console.log('Message %s sent: %s', info.messageId, info.response);
    	res.redirect('/');
    }
    
});
	
})

app.listen(3000);
console.log('server is running on port 3000');













