'use strict';

function Networker(client, handler) {
  this.client = client;
  this.port = 3000;
  this.host = 'localhost';
  this._packet = {};
  
  this._process = false;
  this._state = 'HEADER';
  this._payloadLength = 0;
  this._bufferedBytes = 0;
  this.queue = [];

  this.handler = handler;
}

module.exports = Networker;