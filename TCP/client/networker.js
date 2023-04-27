'use strict';

function Networker(socket, handler) {
  this.socket = socket;
  this._packet = {};
  
  this._process = false;
  this._state = 'HEADER';
  this._payloadLength = 0;
  this._bufferedBytes = 0;
  this.queue = [];

  this.handler = handler;
}

module.exports = Networker;