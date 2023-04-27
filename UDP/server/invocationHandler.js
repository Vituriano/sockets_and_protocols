'use strict';

const Networker = require('./networker');

Networker.prototype._operation = {
  '/': (x, y) => x / y,
  '*': (x, y) => x * y,
  '-': (x, y) => x - y,
  '+': (x, y) => x + y,
};

Networker.prototype.invocationHandler = function ({operator, value1, value2}) {
    console.log({operator, value1, value2});
    return this._operation[operator](value1, value2).toString();
}