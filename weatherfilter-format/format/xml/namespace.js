'use strict';

const _  = require('lodash');
const util = require('./util');
let createNamespaceMixin = url => {
  return  Base => {
    let Mixed = class extends Base {};
    Mixed.prototype.url = url;
    return Mixed;
  }



}

class Tag {

  getNodes(namespaceRoot, parentNode, tag) {
    let targetTag = tag || this.tag;
    let nodes = [];
    let namespaceTags = this._getNamespaceTags(namespaceRoot, targetTag);
    for (let namespaceTag of namespaceTags) {

      let node = parentNode[namespaceTag];

      if(!node){
        continue;
      }
      if(_.isArray(nodes) === false){
        nodes.push(node);

      }
      else {
        nodes = nodes.concat(node);
      }
    }

    return nodes;

  }
  find(namespaceRoot,targetNode, path,tag){
    let finds = [];
    let namespaceXpaths = this._createNameSpaceXpaths(namespaceRoot, path, tag);
    for (namespaceXpath of namespaceXpaths) {
      finds = finds.concat(util.find(targetNode, namespaceXpath) || []);

    }
    return finds;
  }
  findOne(namespaceRoot,targetNode, path,tag){
    let namespaceXpaths = this._createNameSpaceXpaths(namespaceRoot, path, tag);
    for (let namespaceXpath of namespaceXpaths) {
      let find = util.findOne(targetNode, namespaceXpath);
      if(find){
        return find;
      }
    }
    return false;
  }
  _createNameSpaceXpaths(namespaceRoot,path,tag){
    let targetTag = tag || this.tag;
    let targetPath = path || '//' + targetTag;
    let namespaceXpaths = [];
    let namespaceTags = this._getNamespaceTags(namespaceRoot, targetTag);
    for (let namespaceTag of namespaceTags) {
      let namespaceXpath = targetPath.replace(targetTag,namespaceTag);
      namespaceXpaths.push(namespaceXpath);
    }
    return namespaceXpaths;
  }
  _getNamespaceTags(namespaceRoot, tag){
    let attrs = namespaceRoot.$ || {};
    let namespaceTags = [];
    if(attrs.xmlns === this.url){
      namespaceTags.push(tag);
    }

    for (var attr in attrs) {
        if(/^xmlns:/.test(attr) && attrs[attr] === this.url){
          let namespace = attr.replace(/^xmlns:/,'');
          let namespaceTag = `${namespace}:${tag}`;
          namespaceTags.push(namespaceTag);
        }

    }
    return namespaceTags;

  }

}

module.exports.Tag = Tag;
module.exports.createNamespaceMixin = createNamespaceMixin;
