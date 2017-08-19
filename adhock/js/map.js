var map;
var forcusesMap = []
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 32.9877777778, lng: 138.461666667},
    zoom: 4
  });
  initMQTT();

}

function setForcus(forcuses){
  for (var i = 0; i < forcusesMap.length; i++) {
    var marker = forcusesMap[i];
    marker.setMap(null);
  }
  forcusesMap = [];
  for (var i in forcuses) {

    var forcus = forcuses[i];
    var markerOption =  {
        position: {lat:parseFloat(forcus.center.position.lat),lng:parseFloat(forcus.center.position.lng)},
        map: map
    };
    if(forcus.type == 'typhoon'){
      markerOption.icon = 'icon/typhoon.png'
    }
    else{
      markerOption.label = forcus.type;
    }
    var marker = new google.maps.Marker(markerOption)
    forcusesMap.push(marker);
  }
}
