'use strict';

require('./invoker');
require('./invocationHandler');
require('./unmarshaller');
require('./marshaller');
const Networker = require('./networker');
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

let networker = new Networker(socket);

networker.invoker();

socket.bind(networker.port);