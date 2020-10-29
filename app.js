// simple HTTP server using TCP sockets
var net = require('net');

var location = null;

function toRadians(degrees) {
    return degrees * Math.PI / 180;
};


var server = net.createServer(function (socket) {

    socket.on('data', function (data) {
        console.log('Received: ' + data);
        r = data.toString();
        console.log(r.substring(0, 3));

        if (r.substring(0, 3) == "GET") {
            socket.write("HTTP/1.1 200 OK\n");
            socket.write("Access-Control-Allow-Origin: *\n");
            contents = JSON.stringify(location);
            socket.write("Content-Length:" + contents.length);
            socket.write("\n\n"); // two carriage returns
            socket.write(contents);
        } else if (r.substring(0, 4) == "POST") {
            var n = r.indexOf("{");
            // console.log("Found {  at", n);
            var length_useful = r.length - n;
            var useful_data = r.substring(n, n + length_useful);
            location = JSON.parse(useful_data);
            console.log(location);
        }
    });
    socket.on('close', function () {
        console.log('Connection closed');
    });
    socket.on('end', function () {
        console.log('client disconnected');
    });

    socket.on('error', function () {
        console.log('client disconnected');
    });
});
server.listen(8080, function () {
    console.log('server is listening on port 8080');
});
