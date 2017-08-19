const _ = require('lodash');

const Tag = require('weatherfilter-format').xml.namespace.Tag;
const getText = require('weatherfilter-format').xml.util.getText;
const URLMixin = require('./index').URLMixin;
const inBodyTagMixin = require('../index').inBodyTagMixin;

const typhoonClassMap = {"台風（ＴＹ）":"TY",
                    "台風（ＳＴＳ）":"STS",
                    "台風（ＴＳ）":"TS",
                    "熱帯低気圧（ＴＤ）":"TD",
                    "ハリケーン（Ｈｕｒｒｉｃａｎｅ）":"Hurricane",
                    "発達した熱帯低気圧（Ｔｒｏｐｉｃａｌ Ｓｔｏｒｍ）":"Tropical Storm"};

class TyphoonClass extends inBodyTagMixin(URLMixin(Tag)){
  getParams(parent){

    const nodes = this.getNodes(parent);
    if(_.isEmpty(nodes) === true){
      return;
    }
    const node = nodes[0];
    const value = getText(node);
    const result = {};

    if(_.isEmpty(value) === true){
      return
    }
    result.jp = value;
    result.value = typhoonClassMap[value];
    return result;

  }
}

TyphoonClass.prototype.tag = 'TyphoonClass';
module.exports = TyphoonClass;
