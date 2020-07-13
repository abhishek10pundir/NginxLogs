const express = require('express');
const router = express.Router();
 
const userController=require('../Controllers/userController');

module.exports.setRouter=(app)=>{
     

    //signup route
    // params: email, password ,confirm_password
    app.post('/signup', userController.signUpFunction);

    //login route
    // params : email,password
    app.post('/login', userController.loginFunction);

}
