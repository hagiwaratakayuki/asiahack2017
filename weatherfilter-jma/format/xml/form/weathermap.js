'use strict';

const Base = require('./index').MeteorologicalInfos;
const PressureSystem = require('./patterns/pressuresystem');

class Form extends Base {}


Form.prototype.xpath =  "//MeteorologicalInfos[@type='天気図情報']/MeteorologicalInfo"
Form.prototype.validTitles = [
  '地上実況図',
  '地上２４時間予想図',
  '地上４８時間予想図',
  'アジア太平洋地上実況図',
  new RegExp('アジア太平洋海上悪天.*時間予想図'),
];
Form.prototype.paramTags = {'pressuresystem':PressureSystem};
module.exports = Form;
