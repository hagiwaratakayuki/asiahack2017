const _ = require('lodash');

const Tag = require('weatherfilter-format').xml.namespace.Tag;
const getText = require('weatherfilter-format').xml.util.getText;
const URLMixin = require('../index').URLMixin;
const inBodyTagMixin = require('../../index').inBodyTagMixin;
class TypeSpeed extends inBodyTagMixin(URLMixin(Tag)){
  getParams(parent){
    let datas = {};
    const nodes = this.getNodes(parent);
    for (let node of nodes) {
      let unit = node.$.unit;
      let value = getText(node);
      if(unit === 'ノット'){
        unit = 'kt'
      }
      if(_.isEmpty(value)){
        value= "0";
      }
      datas[unit] = parseFloat(value);
    }
    return datas;



  }
};
module.exports = TypeSpeed;
