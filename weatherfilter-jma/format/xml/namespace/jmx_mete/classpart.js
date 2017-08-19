const Tag = require('weatherfilter-format').xml.namespace.Tag;
const URLMixin = require('./index').URLMixin;
const inBodyTagMixin = require('../index').inBodyTagMixin;
const partTagMixin = require('../index').partTagMixin;

const AreaClass = require('../jmx_eb/areaclass');
const IntensityClass = require('../jmx_eb/intensityclass');
const TyphoonClass = require('../jmx_eb/typhoonclass');


class ClassPart extends partTagMixin(inBodyTagMixin(URLMixin(Tag))){};


ClassPart.prototype.tag = 'ClassPart';
ClassPart.prototype.paramTags = {
  'area': AreaClass,
  'intensity': IntensityClass,
  'typhoon': TyphoonClass,
  
}

module.exports = ClassPart;
