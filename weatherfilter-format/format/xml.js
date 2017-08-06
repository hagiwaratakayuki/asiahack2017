const xml2js = require('xml2js');
const xpath = require('xml2js-xpath');
const _ = require('lodash');

var Format = function(pathMap,responseTypeMap){
  this.pathMap = pathMap;
  this.responseTypeMap = responseTypeMap;
  this.xpath = xpath;
}

Format.prototype.parse = function(data){
  var error,result;
   xml2js.parseString(data, function(err, json){
     error = err;
     result = json;
   })
   return result;
}

Format.prototype.executeFilter = function(key,parsed, params){
  
  var path = this.pathMap[key];
  var data = this.xpath.find(parsed, path);
  if(_.isEmpty(data) === true){
    return false;
  }

  if(_.hasIn(this,key) === true){

    return _.invoke(this, key, data, parsed, params);
  }
  return data;
};


Format.getText = function(element){
  if (_.isString(element) === true){
     return element;
  }
  if (_.isObject(element) && _.has(element, '_')) {
      return element._;
  }
  return '';

};

module.exports = Format;
