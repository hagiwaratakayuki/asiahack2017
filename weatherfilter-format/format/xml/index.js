const xml2js = require('xml2js');
const xpath = require('xml2js-xpath');
const util = require('./util');
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

Format.prototype.executeFilter = function(key,doc, params){

  return _.invoke(this, key, doc, params);


};




module.exports.Format = Format;
module.exports.namespace = require('./namespace');
module.exports.util = util
