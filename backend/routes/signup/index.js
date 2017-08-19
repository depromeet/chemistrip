var express = require('express');
var router = express.Router();
var app = express();

var admin = require("firebase-admin");

var serviceAccount = require('../../config/firebase_config.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

router.route('/').post((req,res) => {

	let properties = ['uid','name','email'];
    for(let i=0; i< properties.length;i++){
        if(!req.body.hasOwnProperty(properties[i])){
            res.json({
                result: false,
                msg: "req.body."+properties[i]+"이 없습니다."
            });
            return;
        }
    }

	pool.query( 'select 1 from chemistrip.usr where uid = ?', [ req.body.uid ] , function( err, rows ) {
		if (err){
			res.json({
				result: false,
				msg: "db 접속 에러",
				qry: this.sql
			});
			return;
		}
		if( rows.length === 1 ){
			res.status(201).json({
				result: false,
				msg: "이미 등록된 uid입니다.",
			});
			return;
		}
	});

	let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(!regEmail.test(req.body.email)) {

		 res.json({
            result: false,
            msg: "email 형식이 틀렸습니다."
        });
		return;
	}

	const uid = req.body.uid;
	console.log("uid",uid);
	admin.auth().createCustomToken(uid)
	.then(function(customToken) {

			console.log( customToken );
			InsertQry( customToken );
	})
  	.catch(function(error) {
		console.log(error+Date.now());
		res.json({
			result: false,
			msg: "토큰이 발급을 실패했습니다.",
			data: error
		});
	});

	const InsertQry = (firebaseToken) => {
		pool.query( 'INSERT INTO chemistrip.usr ( firebaseToken, name, email ) VALUES (?,?,?);', [ firebaseToken, req.body.name,req.body.email] , function( err, results ) {
		    if (err){
		        res.json({
		            result: false,
		            msg: "db 접속 에러",
					sql : this.sql
		        });
		        return;
		    }
		    if( results.affectedRows == 1 ){
		        res.json({
					result: true,
					msg: "토큰이 발급되었습니다.",
					data : firebaseToken
				});
		    }else{
		        res.status(201).json({
		            result: false,
		            msg: "디비에서 에러가 났습니다.",
		        });
		    }
		});
	};
});

module.exports = router;
