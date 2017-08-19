const _ = require('lodash');

const util = require('weatherfilter-format').xml.util;
const Pattern = require('./index').Pattern
const Center = require('../../namespace/jmx_mete/centerpart');
const WindSpeed = require('../../namespace/jmx_mete/windspeedPart');
const TyphoonName = require('../../namespace/jmx_mete/typhoonnamepart');
const ClassPart = require('../../namespace/jmx_mete/classpart');






class PressureSystem extends Pattern {
  getParams(targetNode){
    let typeMap = {'高気圧':'high','低気圧':'low','台風':'typhoon','低圧部':'lowarea'}
    let types = util.find(targetNode, '//Type').map(util.getText);
    if(_.isEmpty(_.intersection(_.keys(typeMap),types)) === true){
      return {};
    }
    let result = super.getParams(targetNode);
    if(!result){
      return result;
    }
    for (let typeJp in typeMap) {
      if(types.indexOf(typeJp) > -1){
        result.type = typeMap[typeJp];
      }
    }
    return result;

  }
};

PressureSystem.prototype.parserMap = {
  'center': Center,
  'wind': WindSpeed,
  'class': ClassPart,
  'name': TyphoonName,
}

module.exports = PressureSystem;
