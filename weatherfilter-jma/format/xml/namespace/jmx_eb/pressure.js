
const getText = require('weatherfilter-format').xml.util.getText;
const Tag = require('weatherfilter-format').xml.namespace.Tag;
const URLMixin = require('./index').URLMixin;
const inBodyTagMixin = require('../index').inBodyTagMixin;

const typeMap = {'気圧':'pressure', '現地気圧':'station',"海面校正気圧":'sealevel',"最低気圧":"min",'中心気圧':'center'}
const unitMap = {'ヘクトパスカル':'hPa'}

class Pressure extends inBodyTagMixin(URLMixin(Tag)){
  getParams(parent){
    let datas = [];
    const nodes = this.getNodes(parent);

    for (let node of nodes) {

      let attr = node.$ || {};
      let data = {};
      if(attr.refId){
        data.refId = attr.refId;
      }
      data.type = typeMap[attr.type] || 'pressure';
      data.unit = unitMap[attr.unit] || attr.unit;
      data.value = parseFloat(getText(node))
      datas.push(data);

    }
    if(datas.length === 1){
      return datas[0];
    }
    return datas;
  }

}
Pressure.prototype.tag = 'Pressure';

module.exports = Pressure;
