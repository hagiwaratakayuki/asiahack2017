var map;
var forcusesMap = {}
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.9877777778, lng: 138.461666667},
    zoom: 4
  });
  initMQTT();

}

function setForcus(forcuses){

  for(var id in forcuses){
    var forcus = forcuses[id];
    if(!forcusesMap[id]){
      var markerOption =  {
        position: {lat:parseFloat(forcus.lat),lng:parseFloat(forcus.lng)},
        map: map
      };
      if(forcus.type == '台風'){
        markerOption.icon = 'icon/typhoon.png'
      }
      else{
        markerOption.label = forcus.type;
      }
      var marker = new google.maps.Marker(markerOption)
      forcusesMap[id] = marker;
    }
    else{
      var marker = forcusesMap[id];
      marker.setPosition({lat:parseFloat(forcus.lat),lng:parseFloat(forcus.lng)});

    }

  }

}
