const assert = require('assert');
const format = require('../index').xml.Format;
describe('Test XML Format ', function() {
  describe('Test Parse' ,function(){
    it('should "20" when parse dummy xml and access result.root.elem[0].$.id', function(){
      var form =new format({},{});
      var dummyXML = '<root><elem id="20"></elem></root>'
      var result = form.parse(dummyXML);
      assert(result.root.elem[0].$.id == "20");
    })
  })
  describe('Test executeFilter' ,function(){
    it('should "20" when exuteFilter called', function(){
      var form =new format({'elem':'//elem'},{});
      var dummyXML = '<root><elem id="20"></elem></root>'
      var parsed = form.parse(dummyXML);
      form.elem = function(data, parsed, parsed){
        return data[0].$.id;
      }
      assert(form.executeFilter('elem',parsed) == "20");
    })
  })

});
