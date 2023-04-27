'use strict';

const Networker = require('./networker');

Networker.prototype.invoker = function () {
  this.socket.on('data', (data) => {
    this._bufferedBytes += data.length;
    this.queue.push(data);

    this._process = true;
    this.unmarshaller();
  });

  this.socket.on('served', ({operator, value1, value2}) => {
    let result = this.invocationHandler({operator, value1, value2})
    this.marshaller(result);
  });
};