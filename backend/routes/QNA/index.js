var express = require('express');
var router = express.Router();
var app = express();

router.route('/').post((req,res) => {

	let properties = ['answer'];
    for(let i=0; i< properties.length;i++){
        if(!req.body.hasOwnProperty(properties[i])){
            res.json({
                result: false,
                msg: "req.body."+properties[i]+"이 없습니다."
            });
            return;
        }
    }
    pool.query( 'update chemistrip.usr set answer = ? where firebaseToken = ?;' , [ req.body.answer,  req.body.firebaseToken ] , function(err, results) {
		if (err){
			res.json({
				result: false,
				msg: "db 접속 에러",
				qry: this.sql
			});
			return;
		}

		if( results.affectedRows === 0 ){
            res.status(201).json({
				result: false,
				message: "회원정보가 잘못입력되었습니다.",
			});
			return;
		}else{
            res.status(201).json({
				result: true,
				message: " QNA 입력이 완료되었습니다.",
			});
			return;

        }
	});
});

module.exports = router;
