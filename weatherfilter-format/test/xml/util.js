'use strict';
const assert = require('assert');
const namespace = require('../../index').xml.namespace;
const xml2js = require('xml2js');

describe('Test XML　Util', function() {
  describe('find' ,function(){
    it('should namesapce http://test.example.com', function(){
      const BaseClass = class {};
      const Mixin = namespace.createNamespaceMixin('http://test.example.com')

      const DummyClass = class extends Mixin(BaseClass){}
      const instance = new DummyClass();
      assert(instance.url === 'http://test.example.com')

    })


  })
  describe('Test Tag' ,function(){
    it('should get テスト　from　<root xmlns:hoge="http://test.example.com"><hoge:test>テスト</hoge:test></root>', function(){

      const Mixin = namespace.createNamespaceMixin('http://test.example.com')
      const DummyClass = class extends Mixin(namespace.Tag){
        constructor(){
          super();
          this.tag = 'hoge';
        }
      };
      let instance = new DummyClass();
      let xml;
      xml2js.parseString('<root xmlns:hoge="http://test.example.com"><hoge:test>テスト</hoge:test></root>',(err,result) => {
        xml = result
      })
      let nodes = instance.getNodes(xml.root,xml.root);
      console.log(nodes);
      assert(children === 'テスト')



    })


  })



});
