'use strict';

const Networker = require('./networker');

Networker.prototype.invoker = function () {
  this.socket.on('data', (data) => {
    this._bufferedBytes += data.length;
    this.queue.push(data);

    this._process = true;
    this._unmarshaller();
  });

  this.socket.on('served', this.handler);
};