const express = require('express');
const router = express.Router();
const appConfig=require('../../config/appConfig');


module.exports.setRouter=(app)=>{
    
    //home page render
    app.get('/',(req,res)=>{
        res.render('../Views/login');
    })

    //signup page render
    app.get('/signup',(req,res)=>{
        res.render('../Views/signup');
    })

    //login page render
    app.get('/login',(req,res)=>{
        res.render('../Views/login');
    })

    

}
