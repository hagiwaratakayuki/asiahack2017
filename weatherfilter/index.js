

/*
{
  "name": name,
  "description": "",
  "filters":[
    {
      key:""
      params:{}
      type:"float"

    }

  ],
  response:{

  },
  urls:{
    mqtt:{
      url
    }
  }


}

*/

const uuidv4 = require('uuid/v4');
const _ = require('lodash');
var Filter = function(format, config){

    if(typeof config === 'string'){

      config = JSON.parse(config);
    }

    this.config = config;
    this.format = format;

};

Filter.prototype.execute = function(data){
  var results = {};
  var parsed = this.format.parse(data);
  for (var i = 0; i < this.config.filters.length; i++) {
    var filter = this.config.filters[i];
    var result  = this.format.executeFilter(filter.key, parsed, filter.params)
    if(_.isEmpty(result)){
      continue;
    }
    results[filter.id] = result;

  }
  return results;

}


var Config = function(name, description, format){
  this.name = name;
  this.description = description;
  this.filters = [];
  this.format = format;
};
Config.prototype.addFilter = function(key,params,name,id){
  var filter = {key:key};
  filter.id = id || uuidv4();
  if(name){
    filter.name = name;
  }
  if(params){
    filter.params = params;
  }
  filter.type = this.format.getType(key)
  this.filters.push(filter);


};
Config.prototype.toJSON = function(){
  return  JSON.stringfy( _.omit(this, function(member){
    return _.isFunction(member) || member === 'format';
  }));


}







module.exports.Filter = Filter;
module.exports.Config = Config;
