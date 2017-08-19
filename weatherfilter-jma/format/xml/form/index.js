const _ = require('lodash');

const getParams = require('../namespace').getParams;
const util = require('weatherfilter-format').xml.util;

class Form{
  constructor(doc){

    this.doc = doc;
  }
}

class MeteorologicalInfos extends Form {
  getParams(types) {

    if (!this._isTargetDoc()){

      return false;
    }
    return this._getParams(types);
  }
  _isTargetDoc(){
     const title = util.getText(util.findOne(this.doc,'//Control/Title'));
     for (let valid of this.validTitles) {
       if(_.isRegExp(valid) === true){
         if(valid.test(title) === true){
           return true;
         }
       }
       if(_.isString(valid) === true){
         if(title === valid){
           return true;
         }
       }

     }
     return false;
  }
  _getParams(types, xpath){
    const targetPath = xpath || this.xpath;
    const infos = this._getInfos(targetPath);
    let paramTags = _.pick(this.paramTags,types);


    let results = {};
    for(let info of infos){

      const dateNode = info.DateTime[0];
      const date = util.getText(dateNode);
      const isForecast = (dateNode.$ || {}).type !== "実況"
      for (let item of info.Item) {
        let params = getParams(this,item,paramTags) || {};
        for (var type in params) {
          let typeParams = results[type] || [];
          params[type].date = date;
          params[type].isForecast = isForecast;
          typeParams.push(params[type]);
          results[type] = typeParams;
        }
      }
    }
    return results;
  }
  _getInfos(targetPath){
    return util.find(this.doc,targetPath);
  }

}

exports.Form = Form;
exports.MeteorologicalInfos = MeteorologicalInfos;
