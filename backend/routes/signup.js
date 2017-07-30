var express = require('express');
var router = express.Router();
var app = express();


var admin = require("firebase-admin");

var serviceAccount = require('../config/firebase_config.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

router.route('/').post(function(req,res){

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
		res.json({
			result: true,
			msg: "토큰이 발급되었습니다.",
			data : customToken
		});

	})
  	.catch(function(error) {
		console.log(error+Date.now());
		res.json({
			result: false,
			msg: "토큰이 발급을 실패했습니다.",
			data: error
		});
	});
	//TODO insert문 아직 안넣었다.
	// pool.query( 'update duckmate.member set firebasToken = ? or today_alarm = ? where member_id = ?;', [ req.body.firebasetoken, req.body.today_alarm,req.body.member_id] , function( err, results ) {
    //     if (err){
    //         res.json({
    //             result: false,
    //             msg: "db 접속 에러"
    //         });
    //         return;
    //     }
    //     if( results.affectedRows === 1 ){
    //         res.status(201).json({
    //             result: true,
    //             msg: "업데이트가 완료되었습니다.",
    //         });
    //     }else{
    //         res.status(201).json({
    //             result: false,
    //             msg: "업데이트를 실패했습니다.",
    //         });
    //     }
    // });
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
