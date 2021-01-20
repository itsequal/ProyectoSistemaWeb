const express = require ('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require ('../lib/auth');

router.get('/signup',isNotLoggedIn, (req,res)=>{
    res.render('libros/signup');

});

router.post('/signup',isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/libros',
    failureRedirect: '/signup',
    failureFlash: true
    
}));

router.get('/login',isNotLoggedIn, (req, res) => {
    res.render('libros/login');
});

router.post('/login',isNotLoggedIn, (req,res,next) =>{
    passport.authenticate('local.login',{
        successRedirect: '/libros',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res,next);
});

router.get('/logout', (req,res) =>{
    req.logout();
    res.redirect('/login');
});


module.exports=router;