const express = require('express');
const router = express.Router();
 
const nginxLogsController=require('../Controllers/nginxLogsController');
 


module.exports.setRouter=(app)=>{
    
    app.get('/logs',nginxLogsController.getnginxLogs);
    app.post('/filterlogs',nginxLogsController.filterLogs);
}