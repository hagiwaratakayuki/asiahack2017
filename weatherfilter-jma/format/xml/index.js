const _ = require('lodash');
const Base = require('weatherfilter-format').xml.Format;
const api = require('./api')



class Format extends Base{};
Format.prototype = _.assignIn(Format.prototype, api);

module.exports = Format;
