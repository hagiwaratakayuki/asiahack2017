const Tag = require('weatherfilter-format').xml.namespace.Tag;
const URLMixin = require('./index').URLMixin;
const inBodyTagMixin = require('../index').inBodyTagMixin;
const partTagMixin = require('../index').partTagMixin;

const Coordinate = require('../jmx_eb/coordinate');
const Direction = require('../jmx_eb/direction');
const Pressure = require('../jmx_eb/pressure');
const Speed = require('../jmx_eb/speed');

class CenterPart extends partTagMixin(inBodyTagMixin(URLMixin(Tag))){};


CenterPart.prototype.tag = 'CenterPart';
CenterPart.prototype.paramTags = {
  'position': Coordinate,
  'direction': Direction,
  'speed': Speed,
  'pressure':Pressure,
}

module.exports = CenterPart;
