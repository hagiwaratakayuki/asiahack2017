const _ = require('lodash');

const Tag = require('weatherfilter-format').xml.namespace.Tag;
const getText = require('weatherfilter-format').xml.util.getText;
const URLMixin = require('../index').URLMixin;
const inBodyTagMixin = require('../../index').inBodyTagMixin;

class TypeCoordinate extends inBodyTagMixin(URLMixin(Tag)){
  getParams(parent){

      const nodes = this.getNodes(parent);
      const datas = [];
      for (let node of nodes) {
        let text = getText(node)
        let isTKY = node.$.datum === '日本測地系'
        let isMinute = (node.$.type || "").indexOf('度分') > -1;
        let splited = text.split('/').filter(row => {
          return _.isEmpty(row) === false && /^\s+$/.test(row) === false;
        });
        let data = {isTKY,isMinute};
        let isMultiPoint =splited.length > 1
        if(isMultiPoint === true){
          data.points = [];
        }
        for(let split of splited){
          let point = {};
          let parsed = split.match(/[+-][^+-\s]+/g);
          let lat = parsed[0];
          let lng = parsed[1];
          if(isMinute === true || isTKY === true){
            point.raw = {lat,lng};
          }
          if(isMinute === true){
            lat = parseFloat(lat[0] + '1') * (parseFloat(lat.slice(1,3)) +  parseFloat(lng.slice(3)) / 60);
            lng = parseFloat(lng[0] + '1') * (parseFloat(lng.slice(1,4)) +  parseFloat(lng.slice(4)) / 60);
          }
          else{
            lat = parseFloat(lat);
            lng = parseFloat(lng);
          }

          if(isTKY === true) {
            lat = lat - lat * 0.00010695 + lng * 0.000017464 + 0.0046017
            lng = lng - lat * 0.000046038 - lng * 0.000083043 + 0.010040
          }
          point.lat = lat;
          point.lng = lng;

          if(split.length === 3){
            point.depth = parseFloat(split[2]);
          }
          if(isMultiPoint === true){
            data.points.push(point);
          }
          else {
            data = _.extend(data, point);
          }
        }
        datas.push(data);
      }
      if(datas.length === 1){
        return datas[0]
      }
      return datas;


  }

}

module.exports = TypeCoordinate;
