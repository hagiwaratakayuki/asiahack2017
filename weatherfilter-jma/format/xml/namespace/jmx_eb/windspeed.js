const Type = require('./type/speed')

class WindSpeed extends Type {};

WindSpeed.prototype.tag = 'WindSpeed';
module.exports = WindSpeed;
