const Tag = require('weatherfilter-format').xml.namespace.Tag;
const URLMixin = require('./index').URLMixin;
const inBodyTagMixin = require('../index').inBodyTagMixin;
const partTagMixin = require('../index').partTagMixin;

const WindSpeed = require('../jmx_eb/windspeed');


class WindSpeedPart extends partTagMixin(inBodyTagMixin(URLMixin(Tag))){};


WindSpeedPart.prototype.tag = 'WindSpeedPart';
WindSpeedPart.prototype.paramTags = {
  'values': WindSpeed,

}

module.exports = WindSpeedPart;
