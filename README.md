# Nginxlogs

<h2>Application to list nginx logs</h2>
<h4>Below are the API's and functionalities used in application</h4>

<ul>
<li>http://api.thesoulblog.in/signup: User can register to application via amazon cognito userpool. After registeration confirmation mail will be sent to user mail.</li>
<li>http://api.thesoulblog.in/login: Login with email and password set while registeration via amazon cognito userpool.After login user is redirect to Nginx logs dashboard</li>
<li>http://api.thesoulblog.in/logs : User will redirect after succesfull login. Currently Api is not secured therefore can also directly access. Later will be secured with access token pass from amazon Cognito after login </li> 
<li> Nginx logs can be fliter by IP-Address,Time ,status and request. Choose any one option and pass value related to it. For eg. if filterby IP-Address is choosen  then provide appropriate IP_address in search bar</li>
</ul>
