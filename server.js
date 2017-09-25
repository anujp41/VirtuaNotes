const io = require('socket.io')();

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

io.on('connection', (client) => {
    // here you can start emitting events to the client 
  });