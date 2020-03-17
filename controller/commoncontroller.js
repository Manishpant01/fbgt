const UserSchema = require('../model/userschema');
const key = require('../key');
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

    UserSchema.findOne({ 'email': email }, (err, data) => {
        console.log(data);
        if (err) {
            console.log(err);
        } else if (data == null) {
            console.log('user does not register')
            res.json('user does not register');
        } else {
            data.comparePassword(password, function (err, isMatch) {
                if (err) throw err;
                else {
                    console.log('Password:', isMatch);
                    if (isMatch == false) {
                        let masg = "Password Is Wrong"
                        res.render('reg.html', { masg });
                    }else{ console.log(data);
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
                        })}
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




module.exports = {
    regpage, login, userregpage, userreg
}