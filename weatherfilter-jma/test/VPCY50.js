const fs = require('fs');
const assert = require('assert');
const format = require('../index').xml;
describe('Test VPCY50 XML', function() {
  describe('Test Foctors' ,function(){
    it('should retuen', function(){
      var form =new format();
      var xml = fs.readFileSync('./testdata/VPCY50.xml');
      var parsed = form.parse(xml);

      console.log(form.executeFilter('vpcy50.foctors',parsed))

    })
  })

});
