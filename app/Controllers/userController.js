global.fetch = require('node-fetch');
const check = require('../Libs/checkLib');
const appConfig=require('../../config/appConfig');
const amazonCognitoIdentity=require('amazon-cognito-identity-js');



const poolData={
    UserPoolId:appConfig.userPool.userPoolId,
    ClientId:appConfig.userPool.ClientId
}
const userPool=new amazonCognitoIdentity.CognitoUserPool(poolData);

//signup function for user registeration
let signUpFunction=(req,res)=>{
    //validate user input to check email,passowrd and confirm_password
    let validateUserInput=()=>{
        return new  Promise((resolve,reject)=>{
            if(check.isEmpty(req.body.email)){
                let apiResponse={"error":true,"message":"Email is missing"}
                reject(apiResponse);
            }else if(check.isEmpty(req.body.password)){
                let apiResponse={"error":true,"message":"Password is missing"}
                reject(apiResponse);
            }else if(req.body.password!=req.body.confirm_password){
                let apiResponse={"error":true,"message":"Password mismatch"}
                reject(apiResponse);
            }else{
                resolve(req);
            }
        })
     }
     //end of validate user input

     //signup user using amazon cognito
     let signupUsingAmazonCongnito=()=>{console.log('inside');
         return new Promise((resolve,reject)=>{
            const email=req.body.email;
            const password=req.body.password;
            const emailData={
                Name:"email",
                Value:email
            }
            const emailAttribute=new amazonCognitoIdentity.CognitoUserAttribute(emailData); 
            userPool.signUp(email,password,[emailAttribute],null,(err,data)=>{
                if(err){
                    let apiResponse={"error":true,"message":err};
                    console.log('error',err);
                    reject(apiResponse);
                }else{
                    console.log('data',data);
                    resolve(data.user);
                }
            })
         })
        
     }

     validateUserInput(req,res)
     .then(signupUsingAmazonCongnito)
     .then((resolve)=>{
         let apiResponse={"error":false,"message":"User created successfully","data":resolve};
         res.send(apiResponse);
     })
     .catch((err) => {
         res.send(err);
    })

}


//login function 
let loginFunction=(req,res)=>{
    let validateUserInput=()=>{
        return new Promise((resolve,reject)=>{
            if(check.isEmpty(req.body.email)){
                let apiResponse={"error":true,"message":"Email is missing"}
                reject(apiResponse);
            }else if(check.isEmpty(req.body.password)){
                let apiResponse={"error":true,"message":"Password is missing"}
                reject(apiResponse);
            }else{
                resolve(req);
            }
        })
    }

    let loginUsingAmazonCognito=()=>{
        return new Promise((resolve,reject)=>{
            const loginDetails={
                Username:req.body.email,
                Password:req.body.password
            }
            console.log('log',loginDetails);
            const authenticationDetails=new amazonCognitoIdentity.AuthenticationDetails(loginDetails);
            console.log('auth',authenticationDetails);
            const userDetails={
                Username:req.body.email,
                Pool:userPool
            }
            console.log('user',userDetails);
            const cognitoUser=new amazonCognitoIdentity.CognitoUser(userDetails);
            console.log('cog',cognitoUser);
            cognitoUser.authenticateUser(authenticationDetails,{
                onSuccess:data=>{
                    console.log(data);
                     resolve(data);
                },
                onFailure:error=>{
                    console.log(error);
                    reject(error);
                }
            })
        })
     }

    validateUserInput(req,res)
    .then(loginUsingAmazonCognito)
    .then((resolve)=>{
        res.redirect('/logs');
        //res.render('../Views/dashboard');
    })
    .catch((err) => {
        res.send(err);
   })
}


module.exports={
    signUpFunction:signUpFunction,
    loginFunction:loginFunction
}