const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const config = require('../configs/db');
router.post('/register', (req, res, next) => {
   
    // let newUser=req.body
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    console.log(newUser)
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'failed to register user' });
        } else {
          
            
            user=  User.create(req.body)
            // return    res.status(201).send(user)
            res.send(user);
        }
    });
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        } else {
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({user}, config.secret, {
                        expiresIn: 604800 // 1 week
                    });
                    res.json({
                        success: true, token: 'JWT ' + token, user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            
                        }
                    })
                } else {
                    return res.json({ success: false, msg: 'Wrong Details' });
                }
            })
        }
    })
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });

});

module.exports = router;