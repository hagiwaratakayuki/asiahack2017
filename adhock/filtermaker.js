const fs = require('fs');
var config = {
  name: '気圧の中心位置',
  description: '気圧の位置、台風つき',
  filters:[{
    key:'vpcy50.foctors',
  }],
  urls:{
    mqtt:{
      topic:'Weatherfilter/centers'
    }
  }

}
fs.writeFileSync('./server/public/filters/centers.json',JSON.stringify(config,null , "\t"));
