
const moment = require("moment");
const Tag = require('weatherfilter-format').xml.namespace.Tag;
const getText = require('weatherfilter-format').xml.util.getText;
const URLMixin = require('./index').URLMixin;
const inBodyTagMixin = require('../index').inBodyTagMixin;


class TyphoonNamePart extends inBodyTagMixin(URLMixin(Tag)){
  getParams(targetNode){
    const nodes = this.findOne(targetNode, '//TyphoonNamePart');

    if(!nodes) {
      return;
    }

    let params = {};
    for (var key in nodes) {
      if(key === '_' || '$' === key){
        continue;
      }
      let value = getText(nodes[key][0]);
      if(key === 'Number'){
        params.year = '20' + value.slice(0,2);
        params.issue = value.slice(2);
      }
      if(key === 'Time'){
        value.GMT = moment.UTC(value);
      }
      let k = key.toLowerCase(key);
      params[k] = value;


    }
    return params;
  }

}

module.exports = TyphoonNamePart;
