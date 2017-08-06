var xml2js = require("xml2js");
var xpath = require("xml2js-xpath");
var data;
var res = xml2js.parseString('<root><element id="15"><jmx_eb:Synopsis type="気象要因">ふが\nほげ</jmx_eb:Synopsis></element></root>', function(err, json) {
  // find all elements: returns xml2js JSON of the element
  data = json;
});

console.log(xpath.find(data, "//jmx_eb:Synopsis[@type='気象要因']"));

// find the first element, and get its id:
//var matches = xpath.evalFirst(json, "//element", "id");
