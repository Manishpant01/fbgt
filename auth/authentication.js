const jwt = require('jsonwebtoken');
const key = require('../key');



function checktoken(req,res,next){
    let token = req.cookies.token;
    console.log('>>>>>>>>>>>>>>token :' + token);
    if ((token == undefined) || (token == null)) {

        res.render('reg.html');
    } else {
        jwt.verify(token, key.secretkey, function (err, data) {
            if (err) {
                res.render('reg.html')
            } else {
                console.log(data);
                next();
            }
        })
    }
}



module.exports = {
    checktoken
}