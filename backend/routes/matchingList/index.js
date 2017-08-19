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
            mainAnswer = JSON.parse( rows[0].answer );
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

			try{ rows = JSON.parse( JSON.stringify (rows)); }
			catch(e){ console.log("JSON.stringify, JSON.parse error ",e); }
            console.log("after transforming rows's value",rows);



			let arr = [];
			for(let i = 0; i< rows.length ; i++)
				arr.push(JSON.parse( rows[i].answer));


			let ScoreArr = [];
			for(let i = 0 ; i< arr.length ; i++){

			let Arr = arr[i];
			let Score = 0;
			if( Arr[0] == mainAnswer[0] ){
				Score += 33;
				console.log(Score);

			}

			if( Arr[1] == mainAnswer[1] ){

				 Score += 33;
				                 console.log(Score);
			}

			if(Arr[2] == mainAnswer[2] ){

				 Score += 33;
				                 console.log(Score);
			}
			if( Score === 99) {Score = 100;}
				ScoreArr.push(Score);

			}


			for( let i =0 ; i<rows.length ; i++)
			{


				let Row = rows[i];

				Row.matchingPercent = ScoreArr[i];
			}


            res.status(201).json({
				result: true,
				message: "answer이 등록되어 있지 않습니다",
                datas : rows
			});
    	
    	});
    };


});

module.exports = router;
