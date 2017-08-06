const xml2js = require('xml2js');
const _ = require('lodash');

var Format = function(pathMap,typeMap){
  this.pathMap = pathMap;
  this.typeMap = typeMap;
  this.xapth = xpath;
}

Format.prototype.parse = function(data){
  var error,result;
   xml2js.parseString(data function(err, json){
     error = err;
     result = json;
   })
   return result;
}

Format.prototype.executeFilter = function(key,parsed,params){
  var path = this.pathMap[key];
  var data = this.xpath.find(path);
  params = params || {};
  if(_.isEmpty(data) === true){
    return false;
  }
  if(_.has(this,key) === true){
    return _.invoke(this, key, data, params, parsed);
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
