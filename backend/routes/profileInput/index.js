var express = require('express');
var router = express.Router();
var app = express();

router.route('/').post((req,res) => {

	let properties = ['gender','birthDate','country','name','destination','minDate','maxDate','minAge','maxAge','preferenceGender','memberCount'];
    for(let i=0; i< properties.length;i++){
        if(!req.body.hasOwnProperty(properties[i])){
            res.json({
                result: false,
                msg: "req.body."+properties[i]+"이 없습니다."
            });
            return;
        }
    }
    pool.query( 'insert ignore into chemistrip.usr (gender,birthDate,country,name,destination,minDate,maxDate,minAge,maxAge,preferenceGender,memberCount,firebaseToken) VALUES (?,?,?);' , [ req.body.gender,req.body.birthDate,req.body.country,req.body.name,req.body.destination,req.body.minDate,req.body.maxDate,req.body.minAge,req.body.maxAge,req.body.preferenceGender,req.body.memberCount,req.body.firebaseToken ] , function(err, results) {
		if (err){
			res.json({
				result: false,
				msg: "db 접속 에러",
				qry: this.sql
			});
			return;
		}

		if( results.affectedRows === 1 ){
			res.status(201).json({
				result: true,
				message: "회원정보 입력이 완료되었습니다.",
			});
			return;
		}else{
            res.status(201).json({
				result: false,
				message: "회원정보가 잘못입력되었습니다.",
			});
			return;
        }
	});
});
