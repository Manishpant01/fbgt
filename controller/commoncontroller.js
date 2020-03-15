const UserSchema = require('../model/userschema');
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;


function regpage(req, res) {
    res.render('reg.html')
}

function login(req, res) {
    let username = req.body.username;
    console.log(username);
    let password = req.body.password;
    console.log(password);

    UserSchema.findOne({ 'name': username }, (err, data) => {
        if (err) {
            console.log(err);
        } else if (data == null) {
            console.log('user does not register')
            res.json('user does not register');
        } else {
            console.log(data);
            let name = data.name;
            console.log(name);
            let url = data.url;
            console.log(url);
            let id = data.id;
            console.log(id);
            jwt.sign({ '_id': id }, key.secretkey, { expiresIn: '60m' }, (err, token) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("TOKEN SEND >>>>>>>>>>>>>>>>" + token);
                    res.cookie('token', token).render('dashboard.html', { name, url });
                }


                
            })
        }
    })


}




module.exports = {
    regpage, login
}