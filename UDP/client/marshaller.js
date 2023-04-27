'use strict';

const Networker = require('./networker');

Networker.prototype.marshaller = function (message) {
  let buffer = Buffer.from(message);
  this._header(buffer.length);
  this._packet.message = buffer;
  this._send();
};

Networker.prototype._header = function (messageLength) {
  this._packet.header = { length: messageLength };
};

Networker.prototype._send = function () {
  let contentLength = Buffer.allocUnsafe(2);
  contentLength.writeUInt16BE(this._packet.header.length);
  this.client.send(contentLength, this.port, this.host);
  this.client.send(this._packet.message, this.port, this.host);
  this._packet = {};
};
