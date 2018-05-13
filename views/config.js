var host = "localhost"
var port = "5000";
var typeDeploy = "http";


var getRootUrl = function () {
    var ret = host;
    return port ? ret + ":" + port : ret;
}
var getUrl = function () {
    var ret = typeDeploy + "://" + host;
    return port ? ret + ":" + port : ret;
}


module.exports = {
    host: host,
    port: port,
    getRootUrl: getRootUrl,
    getUrl: getUrl
}

// console.log(getRootUrl())