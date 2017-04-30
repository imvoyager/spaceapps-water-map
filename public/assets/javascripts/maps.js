var circle = undefined;
const RADIUS = 50000;

function initMap() {
  var mapStyle = [{
    'stylers': [{'visibility': 'off'}]
  }, {
    'featureType': 'landscape',
    'elementType': 'geometry',
    'stylers': [{'visibility': 'on'}, {'color': '#20ff20'}]
  }, {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [{'visibility': 'on'}, {'color': '#b4d9ff'}]
  }];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: ranks[0].loc.lat, lng: ranks[0].loc.lon},
        styles: mapStyle,
        disableDoubleClickZoom: true
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
    map.addListener('dblclick', function(e){
        positionZone(e.latLng, map);
        console.log('Clicked!');
    });

    map.addListener('rightclick',function(event){showContextMenu(event.latLng);});
    initControls();
}

function initControls(){
    document.getElementById("clear").onclick = clear;
    document.getElementById("submit").onclick = submit;
}

function positionZone(latLng, map){
    if (circle != undefined){
        circle.setMap(null);
    }
    circle = new google.maps.Circle({
        strokeColor: '#000000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#9adbff',
        fillOpacity: 0.35,
        map: map,
        center: latLng,
        radius: RADIUS,
        editable: true,
        draggable: true
    });
}

function clear() {
    console.log('Clearing!');
    if (circle != undefined){
        circle.setMap(null);
    }
}

function submit() {
    var ne = circle.getBounds().getNorthEast();
    var sw = circle.getBounds().getSouthWest();
    console.log("NE: " + ne + " SW " + sw);
    var url = "/?highLon=" + ne.lng() +"&lowLon=" + sw.lng() + "&highLat=" + ne.lat() + "&lowLat=" + sw.lat();
    console.log(url);
    location.href= url;
}


function showContextMenu(caurrentLatLng  ) {
    console.log('Opening menu!');
    var projection;
    var contextmenuDir;
    projection = map.getProjection() ;
    $('.contextmenu').remove();
    contextmenuDir = document.createElement("div");
    contextmenuDir.className  = 'contextmenu';
    contextmenuDir.innerHTML = '<a id="menu1"><div class="context">menu item 1<\/div><\/a>'
        + '<a id="menu2"><div class="context">menu item 2<\/div><\/a>';

    $(map.getDiv()).append(contextmenuDir);

    setMenuXY(caurrentLatLng);

    contextmenuDir.style.visibility = "visible";
}

function getCanvasXY(caurrentLatLng){
    var scale = Math.pow(2, map.getZoom());
    var nw = new google.maps.LatLng(
        map.getBounds().getNorthEast().lat(),
        map.getBounds().getSouthWest().lng()
    );
    var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
    var worldCoordinate = map.getProjection().fromLatLngToPoint(caurrentLatLng);
    var caurrentLatLngOffset = new google.maps.Point(
        Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
        Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    );
    return caurrentLatLngOffset;
}

function setMenuXY(caurrentLatLng){
    var mapWidth = $('#map_canvas').width();
    var mapHeight = $('#map_canvas').height();
    var menuWidth = $('.contextmenu').width();
    var menuHeight = $('.contextmenu').height();
    var clickedPosition = getCanvasXY(caurrentLatLng);
    var x = clickedPosition.x ;
    var y = clickedPosition.y ;

    if((mapWidth - x ) < menuWidth)//if to close to the map border, decrease x position
        x = x - menuWidth;
    if((mapHeight - y ) < menuHeight)//if to close to the map border, decrease y position
        y = y - menuHeight;

    $('.contextmenu').css('left',x  );
    $('.contextmenu').css('top',y );
}
