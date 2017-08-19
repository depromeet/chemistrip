var express = require('express');
var router = express.Router();
var app = express();

router.route('/').get((req,res) => {


    pool.query( 'select name,country,age,gender,destination,minDate,maxDate,answer from chemistrip.usr where id = ?;' , [ req.query.id ] , function(err, rows) {
		if (err){
			res.json({
				result: false,
				msg: "db 접속 에러",
				qry: this.sql
			});
			return;
		}
        console.log(rows);
        console.log(rows[0]);
        rows = JSON.parse(JSON.stringify(rows[0]));

        let scheduleDuration = ''+rows.minDate+'~'+rows.maxDate+'';

        let UserDatas;
        UserDatas.name = rows.name;
        UserDatas.country = rows.country;
        UserDatas.gender = rows.gender;

        let Schedule;
        Schedule.destination = rows.destination;
        Schedule.schedule = scheduleDuration;


        let Data;
        Data.userDatas = UserDatas;
        Data.scheduleDatas = Schedule;
        Data.answer = rows.answer;


        console.log(Data);

		if( rows.length === 0 ){
            res.status(200).json({
                result: false,
                message: "해당되는 id에 정보가 없습니다.",
			});

		}else{
            res.status(200).json({
				result: true,
				message: "profileDetail입니다.",
                datas : Data
			});
			return;

        }
	});
});

module.exports = router;
