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

Networker.prototype._send = function (rinfo) {
  let contentLength = Buffer.allocUnsafe(2);
  contentLength.writeUInt16BE(this._packet.header.length);
  this.socket.send(contentLength, this.rinfo.port, this.rinfo.address);
  this.socket.send(this._packet.message, this.rinfo.port, this.rinfo.address);
  this._packet = {};
};
