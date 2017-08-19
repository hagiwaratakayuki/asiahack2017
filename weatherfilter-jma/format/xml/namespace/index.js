'use strict';
const util = require('weatherfilter-format').xml.util;

exports.inBodyTagMixin =  Base => class extends Base{
  constructor(doc){
    super();

    this.doc = doc;
    this.namespaceRoot = util.findOne(doc, '//Body');

  }
  getNodes(parentNode){
    return super.getNodes(this.namespaceRoot, parentNode);
  }
  find(targetNode,xpath,tag){
    return super.find(this.namespaceRoot, targetNode, xpath,tag);
  }
  findOne(targetNode,xpath,tag){
    return super.findOne(this.namespaceRoot, targetNode, xpath,tag);
  }
}

exports.partTagMixin = Base => class extends Base {
  getParams(targetNode){
    let valueNode = this.findOne(targetNode);

    return getParams(this,valueNode,this.paramTags);
  }


}
const getParams = (obj,valueNode, paramTags) => {
    let parserMap = {};
    for (var key in paramTags) {
      let parser = initInBodyTag(obj,paramTags[key]);
      parserMap[key] = parser;

    }

    return util.parseParamTag(parserMap, valueNode);

}
exports.getParams = getParams

const initInBodyTag = (obj, cls) => {
  return new cls(obj.doc);
};

exports.initInBodyTag = initInBodyTag
