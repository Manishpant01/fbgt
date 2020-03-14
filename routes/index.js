const express = require('express');
const router = express.Router();
const controler = require('../controller/commoncontroller');
const passport = require('passport');
const UserSchema = require('../model/userschema');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require("passport-twitter").Strategy;

passport.use(new FacebookStrategy({
  clientID: '225718861912716',
  clientSecret: '1d9e1438981d6e3b95032ec69326731d',
  callbackURL: "https://manish-fbgt.herokuapp.com/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email', 'profileUrl']
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    return cb(null, profile);

  }
));




router.get('/', controler.regpage);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));




router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login'
}), (req, res) => {
  console.log("PPPPPPPPPPPPPPPPPPPPPPPP", req.user)
  let user = req.user;
  // res.json({ user });
  // res.render('reg.html');
  let id = user._json.id;
  console.log(id);
  let name = user._json.name;
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.' + name);
  let url = user._json.picture.data.url;
  console.log('>>>>>>>>>>>>..', url);
  let email = user._json.email;
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>......:', email);
  UserSchema.find({ $or: [{ '_id': id }, { 'email': email }] }, (err, result) => {
    console.log('Result:', result);
    console.log('hello');
    if (err) {
      console.log(err);
    } else if (result.length == 0) {
      let userdata = new UserSchema({ 'name': name, 'email': email, '_id': id, 'url': url });
      userdata.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.render('dashboard.html', { name, url });
        }
      })
    } else {

      let name = result[0].name;
      console.log(name);
      let url = result[0].url;
      console.log(url);
      let f_id = result[0]._id;
      console.log(f_id);
      if (f_id == undefined || null) {
        result._id = id;
        result.save((err) => {
          if (err) {
            console.log(err);
          }
        })
      } else {
        res.render('dashboard.html', { name, url });
      }
    }
  })



});




//google

passport.use(new GoogleStrategy({
  clientID: '636232219384-cg4frgdan3ib63detode8tsn2o1ksgue.apps.googleusercontent.com',
  clientSecret: 'dy4HMCgsSwziP_s-yuw-6Jw8',
  callbackURL: "https://manish-fbgt.herokuapp.com/auth/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {

    console.log(profile);
    return cb(null, profile);
  }
));


router.get('/auth/google',
  passport.authenticate('google', { scope: ['email'] }));


router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    console.log("ppppppppppppp", req.user);
    let user = req.user;
     res.json({ user });
    let id = user._json.sub;
    console.log(id);
    let name = user._json.name;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.' , name);
    let url = user._json.picture;
    console.log('>>>>>>>>>>>>..', url);
    let email = user._json.picture.email;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>......:', email);
    UserSchema.find({ $or: [{ '_id': id }, { 'email': email }] }, (err, result) => {
      console.log('Result:', result);
      console.log('hello');
      if (err) {
        console.log(err);
      } else if (result.length == 0) {
        let userdata = new UserSchema({ 'name': name, 'email': email, '_id': id, 'url': url });
        userdata.save(function (err, result) {
          if (err) {
            console.log(err);
          } else {
            res.render('dashboard.html', { name, url });
          }
        })
      } else {

        let name = result[0].name;
        console.log(name);
        let url = result[0].url;
        console.log(url);
        let g_id = result[0]._id;
        console.log(g_id);
        if (g_id == undefined || null) {
          result._id = id;
          result.save((err) => {
            if (err) {
              console.log(err);
            }
          })
        } else {
          res.render('dashboard.html', { name, url });
        }
      }
    })
  });


//Twitter
passport.use(new TwitterStrategy({
  consumerKey: 'mQJ9S0tmXJcDTdPB9uRcwRx4J',
  consumerSecret: 'jWxBcQ89H7KHBT2n8zLxmfFf0APbgbu0n1DthPUhGjm2L8x1DA',
  callbackURL: "https://manish-fbgt.herokuapp.com/auth/twitter/callback"
},
  function (accessToken, refreshToken, profile, cb) {

    console.log(profile)
    return cb(null, profile)
  }
));

router.get('/auth/twitter',
  passport.authenticate('twitter'));


router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function (req, res) {
    console.log("ppppppppppppp", req.user)
    res.send("hello");
  });



module.exports = router;
