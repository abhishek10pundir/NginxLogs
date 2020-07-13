const NginxParser=require('nginxparser');
 

let filterOptions=["IP_Address","Time","Status","Request"];

let getnginxLogs=(req,res)=>{
    let parser = new NginxParser('$remote_addr - $remote_user [$time_local] '
    + '"$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"');

    let data=[];
    let path='/var/log/nginx/access.log'; 
          
    parser.read(path, function (row) {
    //console.log(row);
    data.push(row);
    }, function (err) {
    if (err) throw err;
    res.render('../Views/dashboard',{data:data,filterOptions:filterOptions});
    console.log('Done!')
    });
   
}


let filterLogs=(req,res)=>{
    console.log('filter',req.body.filterBy);
    console.log('value',req.body.value);
    let parser = new NginxParser('$remote_addr - $remote_user [$time_local] '
    + '"$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"');

    let data=[];
    let path='/var/log/nginx/access.log'; 
          
    parser.read(path, function (row) {
    data.push(row);
    }, function (err) {
    if (err) throw err;
    let filterData=[];
    if(req.body.filterBy=="IP_Address")
        filterData=data.filter(value=>value.remote_addr==req.body.value);
    else if(req.body.filterBy=="Time")
        filterData=data.filter(value=>value.time_local==req.body.value);
    else if(req.body.filterBy=="Status")
        filterData=data.filter(value=>value.status==req.body.value);
    else if(req.body.filterBy=="Request")
        filterData=data.filter(value=>value.request==req.body.value);
    res.render('../Views/dashboard',{data:filterData,filterOptions:filterOptions});
    //console.log('Done!')
    });
   
}
module.exports={
    getnginxLogs:getnginxLogs ,
    filterLogs:filterLogs
}

