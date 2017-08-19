var express = require('express');
var router = express.Router();
var app = express();

router.route('/').get((req,res) => {

    pool.query( 'select id,name,minDate,maxDate,gender,answer from chemistrip.usr' , function(err, rows) {
		if (err){
			res.json({
				result: false,
				msg: "db 접속 에러",
				qry: this.sql
			});
			return;
		}
        console.log("rows's value",rows[0]);

        try{
            rows = JSON.parse( JSON.stringify(rows[0]) );
        }catch(e){
            console.log("JSON.stringify, JSON.parse error ",e);
        }
        res.send(rows);
		// if( rows.length === 1 ){
		// 	res.status(201).json({
		// 		result: true,
		// 		message: "회원정보 입력이 완료되었습니다.",
		// 	});
		// 	return;
		// }else{
        //     res.status(201).json({
		// 		result: false,
		// 		message: "회원정보가 잘못입력되었습니다.",
		// 	});
		// 	return;
        // }
	});
});

module.exports = router;
