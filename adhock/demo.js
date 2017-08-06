const xmlFilter = require('../weatherfilter').Filter;
const xmlFormat = require('../weatherfilter-jma').xml;
const mqtt = require('mqtt')
const fs = require("fs");
const _ = require('lodash');
var timerId;


var client  = mqtt.connect('ws://52.192.31.73:1895/', {username:'hackuser', password:'hackuser'})

client.on('connect', function () {
  publishData(client);
  //client.subscribe("Weather/JP/#");
  //client.subscribe('presence')

})



function publishData(client){
  var list = fs.readdirSync("./xml");  //現在のディレクトリ
  var xmls = [];
  for (var i=0; i<list.length; i++){
  	var fileName = "./xml/" + list[i];
    var xml = fs.readFileSync(fileName);
    xmls.push(xml);
  }
  var config = JSON.parse(fs.readFileSync('./server/public/filters/centers.json',{encoding:'utf8'}));
  var format = new xmlFormat();
  var filter = new xmlFilter(format,config);


  timerId = setInterval(function(){
    var xml = xmls.shift();
    var output = {};
    var result = filter.execute(xml);
    var topic = config.urls.mqtt.topic;
    
    for (var key in result) {
      _.extend(output,result[key]);
    }

    xmls.push(xml);
    client.publish(topic, JSON.stringify(output, null, "\t"));
    console.log('published');

  }, 1000)

}
