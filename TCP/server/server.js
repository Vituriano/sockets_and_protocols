'use strict';

require('./invoker');
require('./invocationHandler');
require('./unmarshaller');
require('./marshaller');
const net = require('net');
const Networker = require('./networker');

let server = net.createServer();

server.on('connection', (socket) => {
  console.log("New Connection");
  let networker = new Networker(socket);

  networker.invoker();

  socket.on('end', () => {
    console.log('Socket End');
  });
  socket.on('close', () => {
    console.log('Socket Close');
  });
  socket.on('error', (e) => {
    console.log(e);
  });
});

server.listen(8000);
