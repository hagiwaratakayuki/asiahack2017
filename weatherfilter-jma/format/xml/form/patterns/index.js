const Base = require('../index').Form;

const getParams = require('../../namespace').getParams;

class Pattern extends Base{
  getParams(targetNode){
    return getParams(this, targetNode,this.parserMap);

  }
}

module.exports.Pattern = Pattern;
