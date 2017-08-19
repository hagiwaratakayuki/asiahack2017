'use strict';
const xml2js = require('xml2js');
const xpath = require('xml2js-xpath');
const _ = require('lodash');

exports.getText = (element) => {
  if (_.isString(element) === true){
       return element;
  }
  if (_.isObject(element) && _.has(element, '_')) {
        return element._;
  }
  return '';


};
exports.parse =  (docText, onError) => {
  const callback = onError || function(){};
  let parsed;
  xml2js.parseString(docText, (err, result)=>{
    if (err) {
      callback(err);
    }
    else
    {
      parsed = result;
    }
  })
  return parsed;

};

exports.find = (element, path) => {
  return xpath.find(element, path);

}
exports.findOne = (element, path) => {
  let result = xpath.find(element, path);
  if(_.isEmpty(result) === true){
    return false;
  }
  return result[0];
}

exports.parseParamTag = function (parserMap,target) {
    let result = {};
    for (let key in parserMap) {
      let value = parserMap[key].getParams(target);
      if (_.isEmpty(value) === true) {
        continue;
      }
      result[key] = value;

    }
    return result;
};
