
const getText = require('weatherfilter-format').xml.getText;
var Format = function(){

};
module.exports = Format;

Format.prototype.getPathMap = function () {
  return {
    'foctors':"//jmx_eb:Synopsis[@type='気象要因']"
  };
};
Format.prototype.getResponseTypeMap = function(){
  return {};
}
Format.prototype.foctors = function (data, parsed, params) {
  var result = {};

  for (var i = 0; i < data.length; i++) {

    var match;
    var element = data[i];
    var text = getText(element);
    if(_.isEmpty(text)){
      continue
    }
    var splited = text.split(/\s+/);
    var type = splited[0];
    if(["高","低","台風"].indexOf(type) === -1){
      continue;
    }
    var id = splited[1];
    var raw = {type:type,id:id}
    if(type === '台風'){
      raw.name = splited[2];
    }

    var  match = /北緯(.+?)度/.exec(text)

    if(match){
      raw.lat = this.convartZenkakuToHankaku(match[1]);
    }
    var  match = /東経(.+?)度/.exec(text)
    if(match){
      raw.lng = this.convartZenkakuToHankaku(match[1]);
    }



    result[id] = raw;
  }
  return result;
};
Format.prototype.convartZenkakuToHankaku = function(target){
  target = target.replace('．', '.');
  var olds = '０１２３４５６７８９';
  for (var i = 0; i < olds.length; i++) {
    var oldStr = olds[i];
    var newStr = String(i);
    target = target.replace(oldStr, newStr);
  }
  return target;
};
