const _ = require('lodash');

const Tag = require('weatherfilter-format').xml.namespace.Tag;
const getText = require('weatherfilter-format').xml.util.getText;
const URLMixin = require('../index').URLMixin;
const inBodyTagMixin = require('../../index').inBodyTagMixin;

const directionsMap = {};

class TypeDirection extends inBodyTagMixin(URLMixin(Tag)){
  getParams(parent){
    let datas = [];
    const nodes = this.getNodes(parent);
    for (let node of nodes) {
        let data = {};
        let value = getText(node);
        if(node.$ && node.$.refId){
          data.refId = node.$.refId;
        }
        data.isIndefinite = _.isEmpty(value);
        if (data.isIndefinite === true) {
          datas.push(data);
          continue;
        }
        if(node.$.unit.indexOf('度') > -1){
          data.value = parseFloat(value)
        }
        else{
          let directions = directionsMap[node.$.unit] ;
          data.value = directions.indexOf(value) * 360 / directions.length;
        }
        datas.push(data);

    }
    return datas;



  }
};
module.exports = TypeDirection;
