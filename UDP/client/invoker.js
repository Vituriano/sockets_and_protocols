'use strict';

const Networker = require('./networker');

Networker.prototype.invoker = function () {
  this.client.on('message', (data) => {
    this._bufferedBytes += data.length;
    this.queue.push(data);

    this._process = true;
    this._unmarshaller();
  });

  this.client.on('served', this.handler);
};