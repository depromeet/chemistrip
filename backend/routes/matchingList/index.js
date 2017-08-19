var express = require('express');
var router = express.Router();
var app = express();

router.route('/').get((req,res) => {
    let mainAnswer;
    pool.query( 'select answer from chemistrip.usr where firebaseToken = ?',[req.query.firebaseToken] , function(err, rows) {
        if (err){
			res.json({
				result: false,
				msg: "db 접속 에러",
				qry: this.sql
			});
			return;
		}
        if( rows.length === 1 ){
            mainAnswer = rows[0].answer;
            CheckOthersAnswer( mainAnswer );
		}else{
            res.status(201).json({
				result: true,
				message: "answer이 등록되어 있지 않습니다",
			});
            return;
        }
    });

    const CheckOthersAnswer = ( mainAnswer ) =>{
        pool.query( 'select id,name,minDate,maxDate,gender,answer from chemistrip.usr' , function(err, rows) {
    		if (err){
    			res.json({
    				result: false,
    				msg: "db 접속 에러",
    				qry: this.sql
    			});
    			return;
    		}
            console.log("before transforming rows's value",rows);
            try{ rows = JSON.parse( JSON.stringify(rows) ); }
            catch(e){ console.log("JSON.stringify, JSON.parse error ",e); }
            console.log("after transforming rows's value",rows);

            console.log(mainAnswer[0],mainAnswer[1],mainAnswer[2]);
            console.log("rows[0].answer[0]은?",rows[0].answer[0]);
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
    };


});

module.exports = router;
