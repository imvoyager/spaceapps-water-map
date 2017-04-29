/**
 * Created by KNYordanov on 29.4.2017 г..
 */
var gmaps = require('google-maps');
var app = express();
var async = require('async');
var io;

app.get('/', function (req, res) {
    res.write('<html>\n<head>\n<style>\n')
    res.write('#map { height: 400px; width: 100%;}\n')
    res.write('</style>\n</head>\n')
    res.write('<body>\n<div id="map"></div>\n')
    res.write('<script>\n')
});

app.listen(3000);

var req = request('https://maps.googleapis.com/maps/api/js?key=AIzaSyCQZ-jlREcmgiolyPb8qwIKH296-vwdNYI&callback=initMap')

function initMap() {
  var geoLoc = {lat: , lng: 131.044};
  var map = new gmaps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new gmaps.Marker({
    position: geoLoc,
    map: map
  });
}
