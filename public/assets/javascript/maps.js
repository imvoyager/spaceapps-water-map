function initMap() {
    var uluru = {lat: highest.loc.lat, lng: highest.loc.lon};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    for (var i = 0; i < ranks.length; i++) {
        new google.maps.Marker({
            position: {lat: ranks[i].loc.lat, lng: ranks[i].loc.lon},
            map: map
        });
    }
}
