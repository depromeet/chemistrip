var express = require('express');
var router = express.Router();
var app = express();


var admin = require("firebase-admin");

var serviceAccount = require('../config/firebase_config.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

router.route('/').post(function(req,res){
	// for(let key in req.body){
	//     if(!req.body[key]){
	//         res.json({
	//             result: false,
	//             msg: "req.body."+key+"이 없습니다."
	//         });
	//         return;
	//     }
	// }
	if( !req.body.uid ){
        res.json({
            result: false,
            msg: "req.body.uid이 없습니다."
        });
        return;
    }else if( !req.body.name ){
        res.json({
            result: false,
            msg: "req.body.name이 없습니다."
        });
        return;
    }else if( !req.body.email ){
        res.json({
            result: false,
            msg: "req.body.email이 없습니다."
        });
        return;
    }

	const uid = req.body.uid;
	admin.auth().createCustomToken(uid)
	.then(function(customToken) {
		InsertQry(customToken);
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
		pool.query( 'INSERT INTO chemistrip.usr ( firebase_token, name, email ) VALUES (?,?,?);', [ firebaseToken, req.body.name,req.body.email] , function( err, results ) {
		    if (err){
		        res.json({
		            result: false,
		            msg: "db 접속 에러"
		        });
		        return;
		    }
		    if( results.affectedRows == 1 ){
		        res.json({
					result: true,
					msg: "토큰이 발급되었습니다.",
					data : customToken
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
