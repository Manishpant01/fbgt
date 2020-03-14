const UserSchema = require('../model/userschema');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;


function regpage(req,res){
    res.render('reg.html')
}

function login(req,res){
    let username = req.body.username;
    console.log(username);
    let password = req.body.password;
    console.log(password);

    UserSchema.findOne({'name':username},(err,data)=>{
        if(err){
            console.log(err);
        }else if(data == null){
            console.log('user does not register')
            res.json('user does not register');
        }else{
            console.log(data);
            let name = data.name;
            console.log(name);
            let url = data.url;
            console.log(url);
            res.render('dashboard.html', { name, url });

        }
    })


}




module.exports = {
    regpage,login
}