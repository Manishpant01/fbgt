const userschema = require('../model/userschema');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;


function regpage(req,res){
    res.render('reg.html')
}




module.exports = {
    regpage
}