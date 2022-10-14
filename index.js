import http from 'http'

http.createServer(function(request, response) {
    response.writeHeader(200, { "Content-Type": "text/plain" });
    response.write("Node JS Running on EC2");
    response.end();
}).listen(80);
