var mqtt;
function initMQTT(){
  mqtt = new Paho.MQTT.Client('ws://52.192.31.73:1895/',1895,'waetherfilter','');

  // set callback handlers
  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;

  // connect the mqtt
  mqtt.connect({hosts:['ws://52.192.31.73:1895/'], onSuccess:onConnect,userName:'hackuser', password:'hackuser'});


  // called when the mqtt connects
  function onConnect() {
    console.log('connect');
    //mqtt.subscribe('Weatherfilter/centers');
  }

  // called when the mqtt loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    var json = JSON.parse(message.payloadString);
    onMQTTMessage(json);
  }
}
