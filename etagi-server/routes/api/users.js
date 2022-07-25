const express = require('express');
const passport = require('passport');
const router = express.Router()

router.post('/auth',    
    (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err;
        if(!user) res.status(401).send(info);
        else{
            req.logIn(user, (err) =>{
                if (err) throw err;
                res.send(req.user);
                console.log(req.user);
            })
        }
    })(req, res, next);
});

router.get('/user', (req,res) => {
    console.log("init query");
    console.log(req.user);
    res.send(req.user);
})

router.post('/deAuth',(req, res) => {
    console.log("logout");
    req.logOut((err) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            console.log("noError");
            res.send("DeAuthed");
        }
    });
});


module.exports = router