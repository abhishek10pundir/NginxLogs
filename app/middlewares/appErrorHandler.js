


let errorHandler = (err,req, res, next) => {
    console.log("application error handler called");
    console.log(err);

    let apiResponse = {"error":true, 'message':'Some error occured at global level'}
    res.send(apiResponse)
    
}// end request ip logger function 

let notFoundHandler = (req,res,next)=>{

    console.log("Global not found handler called");
    
    res.render('../Views/401');

}// end not found handler

module.exports = {
    globalErrorHandler : errorHandler,
    globalNotFoundHandler : notFoundHandler
}
