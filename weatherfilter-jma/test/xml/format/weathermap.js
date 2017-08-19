'use strict';
const fs = require('fs');
const path = require('path')

const assert = require('assert');
const util = require('weatherfilter-format').xml.util;
const Weathermap = require('../../../format/xml/form/weathermap');
const Format = require('../../../format/xml');
const sampleDir = require('../../index').SAMPLEPATH;

describe('Test wathermap format', function() {
  describe('Test Pressure System' ,function(){
    it('should retuen', function(){
        //let xml = fs.readFileSync('./testdata/weathermap/typhoon.xml');
        //let doc = util.parse(xml);
        //let form = new Weathermap(doc);
        //console.log(form.getWeatherInfo('pressuresystem'));
        let xml = fs.readFileSync(path.join(sampleDir , '63_01_01_130523_VZSA60.xml'));

        let format = new Format();
        let doc = format.parse(xml);

        console.log(format.executeFilter('meteorology.pressuresystem',doc,{})[0].isForecast);

    })
  })

});
