const express = require('express');
const router = express.Router();


const signup = require('./signup');
router.use('/signup',signup);

const profileInput = require('./profileInput');
router.use('/profileInput',profileInput);

router.use((req, res, next)=>{
    let firebaseToken;
    let rqstMethodCheck = (req.method == 'GET') ? req.query : req.body;
    if( !rqstMethodCheck.firebaseToken ){
        res.json({
            result: false,
            msg: "[ firebaseToken ]이 필요함"
        });
        return;
    } else {
        firebaseToken = rqstMethodCheck.firebaseToken ;
    }

	pool.query( 'select 1 from duckmate.member where firebaseToken = ?;' ,[ firebaseToken ] , (err,rows)=>{
        // TODO 은행업무중에서 헤리슨님한테 -10 나 +10해야하는데
        // 헤리슨님 -10하고 죽음 안되니까 transaction을 써야한다
        if (err){
            res.status(500).json({
                result: false,
                msg: "db 접속 에러",
                qry: this.sql
            });
            return;
        }

        if( rows.length === 0 )
        {
            res.status(200).json({
                result: false,
                msg: "등록된 토큰이 없네요.",
            });
        }
        else next();

    });
});

/*
const QNA = require('./QNA');
router.use('/QNA',QNA);

const matchingList = require('./matchingList');
router.use('/matchingList',matchingList);

const profileDetail = require('./profileDetail');
router.use('/profileDetail',profileDetail);

*/


module.exports = router;
