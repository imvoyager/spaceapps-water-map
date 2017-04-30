function initMap() {
  var mapStyle = [{
    'stylers': [{'visibility': 'off'}]
  }, {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [{'visibility': 'on'}, {'color': '#ff0000'}]
  }, {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{'visibility': 'on'}, {'color': '#0000ff'}]
  }];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: ranks[0].loc.lat, lng: ranks[0].loc.lon},
        styles: mapStyle
    });
    for (var i = 0; i < ranks.length; i++) {
        (function(i) {
            var infoWindow = new google.maps.InfoWindow({
                content: 'Day: ' + (i + 1)
            });
            var icon = '/assets/images/' + (i === highestIndex ? 'rain_' : '') + 'cloud.png';
            var marker = new google.maps.Marker({
                position: {lat: ranks[i].loc.lat, lng: ranks[i].loc.lon},
                icon: icon,
                map: map
            });

            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        })(i);
    }
}
