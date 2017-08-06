const _ = require('lodash');
const Base = require('weatherfilter-format').xml
const classes =['vpcy50'];

const classDir ='./xmlclasses';

var Format = function(){
    var pathMap = {};
    var responseTypeMap = {};
    for (var i = 0; i < classes.length; i++) {
      var clsName = classes[i];
      var path = classDir + '/' + clsName;
      var cls =  require(path);
      var format = new cls();
      this[clsName] = format;

      var pthMp = format.getPathMap()
      for (var key in pthMp) {
        pathMap[clsName + '.' + key] = pthMp[key];
      }
      var rtMp = format.getResponseTypeMap();
      for (var key in rtMp) {
        responseTypeMap[clsName + '.' + key] = rtMp[key];
      }

    }
    
    var base = new Base(pathMap,responseTypeMap);
    _.extend(this, base);

}

module.exports = Format;
