const _ = require('lodash');

const Tag = require('weatherfilter-format').xml.namespace.Tag;
const getText = require('weatherfilter-format').xml.util.getText;
const URLMixin = require('./index').URLMixin;
const inBodyTagMixin = require('../index').inBodyTagMixin;

const areaSizeMap = {'大型':'large', '超大型':'extralarge'};

class AreaClass extends inBodyTagMixin(URLMixin(Tag)){
  getParams(parent){

    const nodes = this.getNodes(parent);
    if(_.isEmpty(nodes) === true){

      return false;
    }
    const node = nodes[0];
    const value = getText(node);
    const result = {};

    if(_.isEmpty(value) === true){
      return
    }
    result.jp = value;
    result.value = areaSizeMap[value];
    return result;

  }
}

AreaClass.prototype.tag = 'AreaClass';
module.exports = AreaClass;
