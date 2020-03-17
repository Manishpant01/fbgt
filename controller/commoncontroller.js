const UserSchema = require('../model/userschema');
const key = require('../key');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;
// const passport = require('passport');
// const Strategy = require('passport-facebook').Strategy;
let masg = "";


function regpage(req, res) {
    res.render('reg.html', { masg })
}

function login(req, res) {
    let email = req.body.email;
    console.log(email);
    let password = req.body.password;
    console.log(password);
    if (email == '' || password == '') {
        let masg = 'None Data Found';
        res.render('reg.html', { masg })
    }

    UserSchema.findOne({ 'email': email }, (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
        } else if (data == null) {
            console.log('user does not register')
            res.json('user does not register');
        } else {
            data.comparePassword(password, function (err, isMatch) {
                if (err) {
                    let masg = "Please click on Forgot Password to Generate Your Password"
                    res.render('reg.html', { masg })
                }
                else {
                    console.log('Password:', isMatch);
                    if (isMatch == false) {
                        let masg = "Password Is Wrong"
                        res.render('reg.html', { masg });
                    } else {
                        console.log(data);
                        let name = data.name;
                        console.log(name);
                        let url = data.url;
                        console.log(url);
                        let id = data.id;
                        console.log(id);
                        jwt.sign({ '_id': id }, key.secretkey, { expiresIn: '60m' }, (err, token) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("TOKEN SEND >>>>>>>>>>>>>>>>" + token);
                                res.cookie('token', token).render('dashboard.html', { name, url });
                            }
                        })
                    }
                }

            })
        }
    })
}
function userregpage(req, res) {
    res.render('register.html');
}
function userreg(req, res) {
    let email = req.body.email;
    console.log(email);
    let name = req.body.name;
    console.log(name);
    let password = req.body.pass;
    console.log(password);
    if (email == '' || name == '' || password == '') {
        let masg = 'None Data Found';
        res.render("reg.html", { masg });

    } else {
        UserSchema.findOne({ 'email': email }, (err, result) => {
            console.log(result);
            if (err) {
                console.log(err)
            } else if (result == null) {
                let userdata = new UserSchema({ 'name': name, 'email': email, 'password': password });
                userdata.save(function (err, result) {
                    if (err) {
                        console.log('>>>>..', err)
                    } else {
                        console.log("result::", result);
                        let masg = "Successfully Registered"
                        res.render('reg.html', { masg })
                    }
                })
            } else {
                let masg = "You allready Registered"
                res.render('reg.html', { masg })
            }
        })
    }

}

function forgotpage(req, res) {
    res.render('forgotpass.html', { masg });
}


function passchange(req, res) {
    let email = req.body.email || undefined;
    console.log(email);
    let pass = req.body.pass || undefined;
    console.log(pass);
    let hashpass = req.newpassword;
    console.log(hashpass);
    if (email == undefined || pass == undefined) {
        let masg = 'None Data Found';
        res.render("forgotpass.html", { masg });
    } else {
        UserSchema.findOneAndUpdate({ 'email': email }, { $set: { 'password': hashpass } }, (err, data) => {
            if (err) {
                console.log(err);
            } else if (data == null) {
                let masg = "You are Not Registered"
                res.render('forgotpass.html', { masg })
            } else {
                console.log("data:>>>>", data);
                let masg = " Your Password successfully Saved"
                res.render('reg.html', { masg })
            }
        })
    }
}

function newpass(req, res, next) {
    let pass = req.body.pass;
    console.log(pass);
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(pass, salt, function (err, hash) {
            if (err) return next(err);

            newpassword = hash;
            req.pass = pass;
            req.newpassword = newpassword;
            console.log(newpassword);

            next();

        })
    })
}




module.exports = {
    regpage, login, userregpage, userreg, forgotpage, passchange, newpass
}