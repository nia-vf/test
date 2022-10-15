import http from 'http';
import url from 'url';
import fs from 'fs';

http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
        case "/":
            response.writeHeader(200, { "Content-Type": "text/plain" });
            response.end();
            break;
        case "/HtmlPage1.html":
            fs.readFile(__dirname + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(data);
                    response.end();
                }
            });
            break;
        case "HtmlPage2.html":
            fs.readFile(__dirname + path, function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write(error);
                    response.end();
                } else {
                    response.writeHead(200, { "Content-Type": "text/html" });
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("Oops this doesn't exist - 404");
            response.end();
            break;
    }
}).listen(80);
