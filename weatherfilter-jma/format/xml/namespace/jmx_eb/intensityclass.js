const _ = require('lodash');

const Tag = require('weatherfilter-format').xml.namespace.Tag;
const getText = require('weatherfilter-format').xml.util.getText;
const URLMixin = require('./index').URLMixin;
const inBodyTagMixin = require('../index').inBodyTagMixin;

const intensityMap = {'強い':'strong', '非常に強い':'verystrong', '猛烈な':'violent'};

class IntensityClass extends inBodyTagMixin(URLMixin(Tag)){
  getParams(parent){

    const nodes = this.getNodes(parent);
    if(_.isEmpty(nodes) === true){
      return;
    }
    const node = nodes[0];
    const value = getText(node);
    const result = {};
    if(_.isEmpty(value) === true){
      return
    }
    result.jp = value;
    result.value = intensityMap[value];
    return result;

  }
}

IntensityClass.prototype.tag = 'Intensity';

module.exports = IntensityClass;
