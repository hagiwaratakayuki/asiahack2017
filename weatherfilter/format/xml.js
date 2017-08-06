const xml2js = require('xml2js');
const xpath = require('xml2js-xpath');
const _ = require('lodash');

var Format = function(pathMap,typeMap){
  /*console.log('here');
  this.pathMap = pathMap;
  this.typeMap = typeMap;
 */
}

Format.prototype.parse = function(data){
  var xml,error;
  xml2js.parseString(data,function(err, json){
    xml = json;
    error = err;

  });
  return xml;
}

Format.prototype.excuteFilter = function(parsed,key,params){
  var path = this.pathMap[key];
  var find = xpath.find(parsed,path);

  if(_.isEmpty(find)){
    return false;
  }
  if(_.has(this,key)){
    return _.invoke(this.key,find,params);
  }

}


module.exports = Format;
