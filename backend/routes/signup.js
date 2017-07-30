var express = require('express');
var router = express.Router();
var app = express();


var admin = require("firebase-admin");

var serviceAccount = require('../config/firebase_config.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

router.route('/').post(function(req,res){

	let tokenArr = [];


	const uid = req.body.uid;

	admin.auth().createCustomToken(uid)
	.then(function(customToken) {

		tokenArr.push(customToken);	  

		
		
		res.json({
		result: true,
		msg: "토큰이 발급되었습니다.",
		data : tokenArr
	});	

		
		console.log("#",customToken);
	})
  	.catch(function(error) {
		      console.log("Error creating custom token:", error);
			    });

	
});



/*
request -
{
	    "uid": "124125125124123123",
			    "name": "jang",
				    "email": "test@email.com"
}

response -
{
	    "token": "adsfasdfafasfds"
}
*/
module.exports = router;
