let appConfig = {};
appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
userPool={"userPoolId":"ap-south-1_27jMiZn8c","ClientId":"2qlji90237kh5tm9tgv3g7viqv"}
pool_region='ap-south-1';

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    userPool:userPool,
    pool_region:pool_region
};