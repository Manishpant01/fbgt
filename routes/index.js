const express = require('express');
const router = express.Router();
const controler = require('../controller/commoncontroller');
const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '225718861912716',
    clientSecret: '1d9e1438981d6e3b95032ec69326731d',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
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

module.exports = router;
