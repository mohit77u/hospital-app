const User = require('../models/user');
const PasswordReset = require("../models/passwordReset");
const ForgotPasswordMail = require('../mailers/ForgotPasswordMail');

// render the sign up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/');
    }
    return res.render('auth/signup')
};

// render the sign in page                         
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        console.log(req.user)
        return res.redirect('/');
    }
    return res.render('auth/login')
};

// get sign-up data
module.exports.create = async(req, res) =>{
    // check whether password and confirm password matches or not
    if (req.body.password != req.body.password_confirmation) {
        req.flash('error','Confirmation password mismatch.')
        return res.redirect('back');
    }

    // find user by phone
    const user = await User.findByPhone(req.body.phone);

    console.log(user)
    // if user not exists
    if (!user) {
        const user = new User({
            name: req.body.name,
            phone: req.body.phone,
            role: req.body.role,
            password: req.body.password,
        });
    
        await user.save();
        return res.redirect('/signin')
    }
    else
    {
        req.flash('error', 'User already exists with phone number entered.');
        return res.redirect('back');
    }
}

// get sign-in data
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully')
    // assuming user is already signed in so we need to redirect
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    // this function is automated by passport js
    req.logout(function(err){
        return next(err);
    });
    req.flash('success', 'You have logged out');
    return res.redirect('/signin')
}
