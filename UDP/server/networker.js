'use strict';

function Networker(socket) {
  this.socket = socket;
  this.port = 3000;
  this._packet = {};
  this.rinfo = null;
  
  this._process = false;
  this._state = 'HEADER';
  this._payloadLength = 0;
  this._bufferedBytes = 0;
  this.queue = [];
}

module.exports = Networker;