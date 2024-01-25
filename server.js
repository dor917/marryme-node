var express = require('express');
var filesSystem = require('fs');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 3309;


// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {   //연결이 들어오면 실행되는 이벤트
    // socket 변수에는 실행 시점에 연결한 상대와 연결된 소켓의 객체가 들어있다.

    //socket.emit으로 현재 연결한 상대에게 신호를 보낼 수 있다.
    socket.emit('usercount', io.engine.clientsCount);

    // on 함수로 이벤트를 정의해 신호를 수신할 수 있다.
    socket.on('message', (msg) => {
        //msg에는 클라이언트에서 전송한 매개변수가 들어온다. 이러한 매개변수의 수에는 제한이 없다.
        console.log('Message received: ' + msg);

        // io.emit으로 연결된 모든 소켓들에 신호를 보낼 수 있다.
        // io.emit('message', msg); 받기만하고 보내줄 필요가 없어 잠시 대기
        /* 파일 작성 */

        filesSystem.stat('test.txt', (err, stats) => {
            if ( !stats.isFile() ){
                filesSystem.writeFileSync("test.txt");
              } 
        });

        //파일 내용 작성
        filesSystem.open('test.txt'), 'a', (err, file) => {
            if (err) throw err;
            console.log(data);
        }
    });
});

server.listen(port, function () {
    console.log('Listening on http://localhost:' + port);
});