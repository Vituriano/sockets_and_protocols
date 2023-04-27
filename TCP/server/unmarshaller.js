'use strict';

const Networker = require('./networker');

Networker.prototype.unmarshaller = function (_) {
  while (this._process) {
    switch (this._state) {
      case 'HEADER':
        this._getHeader();
        break;
      case 'PAYLOAD':
        this._getPayload();
        break;
    }
  }
}

Networker.prototype._getHeader = function () {
  if (this._hasEnough(2)) {
    this._payloadLength = this._readBytes(2).readUInt16BE(0, true);
    this._state = 'PAYLOAD';
  }
}

Networker.prototype._getPayload = function () {
  if (this._hasEnough(this._payloadLength)) {
    let received = this._readBytes(this._payloadLength);
    let expression = received.toString().split(' ');
    let operator = expression[1];
    let value1 = parseInt(expression[0]);
    let value2 = parseInt(expression[2]);
  
    this.socket.emit('served', {operator, value1, value2});
    this._state = 'HEADER';
  }
}

Networker.prototype._hasEnough = function (size) {
  if (this._bufferedBytes >= size) {
    return true;
  }
  this._process = false;
  return false;
}

Networker.prototype._readBytes = function (size) {
  let result;
  this._bufferedBytes -= size;

  if (size === this.queue[0].length) {
    return this.queue.shift();
  }

  if (size < this.queue[0].length) {
    result = this.queue[0].slice(0, size);
    this.queue[0] = this.queue[0].slice(size);
    return result;
  }
  
  result = Buffer.allocUnsafe(size);
  let offset = 0;
  let length;
  
  while (size > 0) {
    length = this.queue[0].length;

    if (size >= length) {
      this.queue[0].copy(result, offset);
      offset += length;
      this.queue.shift();
    } else {
      this.queue[0].copy(result, offset, 0, size);
      this.queue[0] = this.queue[0].slice(size);
    }

    size -= length;
  }

  return result;
}
