const _ = require('lodash');

const util = require('../util.js');
const formClasses = [
  require('../../form/weathermap'),
];

module.exports = (doc, params) => {
  let filterParams = {} ||  params
  let results = (util.execute(doc, formClasses, ['pressuresystem']) || {}).pressuresystem || [];
  let filter = util.createFilter([
    result => {
      if(_.hasIn('type') === false){
        return true;
      }
      let type = params.type;
      if(_.isArray(params.type) === false){
        type = [type];
      }
      return type.indexOf(result.type) > -1;
    }
  ]);
  return results.filter(filter);
};
