function parseFilter(filter) {
  var urls = filter.urls;
  if(urls.mqtt){
    mqtt.subscribe(urls.mqtt.topic)

  }
};

function onMQTTMessage(json){
  setForcus(json);

}
$(function(){
  $('#controll [data-type=load]').click(function(){
    var url = $('#controll [name=url]').val();
    console.log(url);
    jQuery.getJSON(url,parseFilter);
    return false;
  })
})
