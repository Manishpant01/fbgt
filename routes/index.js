const express = require('express');
const router = express.Router();
const controler = require('../controller/commoncontroller');
const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new FacebookStrategy({
    clientID: '225718861912716',
    clientSecret: '1d9e1438981d6e3b95032ec69326731d',
    callbackURL: "https://manish-fbgt.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email','profileUrl']
  },
  function(accessToken, refreshToken, profile, cb) {

   return cb(null,profile);
  }
));




router.get('/',controler.regpage); 
router.get('/auth/facebook', passport.authenticate('facebook'));




router.get('/auth/facebook/callback',passport.authenticate('facebook', { 
    failureRedirect: '/login' }),(req,res)=>{
      console.log("PPPPPPPPPPPPPPPPPPPPPPPP",req.user)
      res.render('reg.html');
    });




//google

        passport.use(new GoogleStrategy({
            clientID: '636232219384-cg4frgdan3ib63detode8tsn2o1ksgue.apps.googleusercontent.com',
            clientSecret: 'dy4HMCgsSwziP_s-yuw-6Jw8',
            callbackURL: "https://manish-fbgt.herokuapp.com/auth/google/callback"
          },
          function(accessToken, refreshToken, profile, cb) {
        
            console.log(profile)
            return cb(null,profile)
          }
        ));
        
        
        router.get('/auth/google',
          passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
        
        
        router.get('/auth/google/callback', 
          passport.authenticate('google', { failureRedirect: '/login' }),
          function(req, res) {
            console.log("ppppppppppppp",req.user)
            res.send("hello");
          });
        

module.exports = router;
