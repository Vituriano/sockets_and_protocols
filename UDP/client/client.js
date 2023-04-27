'use strict';

require('./invoker');
require('./unmarshaller');
require('./marshaller');
const Networker = require('./networker');
const dgram = require('dgram');
const client = new dgram.Socket('udp4');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log(`Insira o calculo seguindo o formato: 5 + 6`);

let networker = new Networker(client, (data) => {
  console.log("A resposta é: " + data.toString());
});

networker.invoker();

rl.addListener('line', line => {
    networker.marshaller(line);
});