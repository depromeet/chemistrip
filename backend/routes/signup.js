var express = require('express');
var router = express.Router();
var app = express();


router.route('/').post(function(req,res){
//router.post('/', function(req, res, next) {

    console.log("time" + Date.now());
    res.json('depromeet');
});

module.exports = router;
