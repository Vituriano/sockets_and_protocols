'use strict';

require('./invoker');
require('./unmarshaller');
require('./marshaller');
const net = require('net');
const Networker = require('./networker');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log(`Insira o calculo seguindo o formato: 5 + 6`);

let socket = net.createConnection({ port: 8000, host: 'localhost' });
socket.on('connect', () => {
  let networker = new Networker(socket, (data) => {
    console.log("A resposta é: " + data.toString());
  });
  // começa a ouvir
  networker.invoker();

  // codifica a mensagem e envia para o servidor

  rl.addListener('line', line => {
    const message = Buffer.from(line);
    networker.marshaller(message);
  });
});