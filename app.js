const express = require('express');
const path = require('path');
const ranker = require('./lib/ranker.js');
const PORT = 3000;

const app = express();

var groundwetness = require('./lib/ground_wetness.js');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', homepage);
app.post('/', homepage);

function homepage (req, res, next) {
    groundwetness.PND();
    var highBound;
    var lowBound;
    if (req.query.lowLat && req.query.lowLon && req.query.highLat && req.query.highLon) {
        highBound = {'lon': Number(req.query.highLon),
            'lat': Number(req.query.highLat)};
        lowBound = {'lon': Number(req.query.lowLon),
            'lat': Number(req.query.lowLat)};
    } else {
        highBound = {'lon': 180, 'lat': 90};
        lowBound = {'lon': -180, 'lat': -90};
    }
    ranker.rank(highBound, lowBound, function(err, ranks) {
        if (err) {
            next(err);
            return;
        }
        var highest = ranks.reduce(function(prev, ele) {
            return ele.rank > prev.rank ? ele : prev;
        }, {'rank': Number.NEGATIVE_INFINITY});
        var highestIndex = ranks.indexOf(highest);
        console.log('JJJJJJ');
        console.log(ranks);
        console.log(highest);

        res.send('<html>' +
            '<head>' +
            '<style>' +
            '#map { height: 80%; width: 100%;}' +
            '</style>' +
            '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>' +
            '<script src="/assets/javascripts/control.js"></script>' +
            '<link rel="stylesheet" type="text/css" href="assets/css/menu.css">' +
            '</head>' +
            '<body><h3>When to seed the rain cloud</h3>' +
            '<div id="map"></div>' +
            '<script>' +
            'var ranks = ' + JSON.stringify(ranks) + ';' +
            'var highestIndex = ' + JSON.stringify(highestIndex) + ';' +
            '</script>' +
            '<script async defer ' +
            'src="/assets/javascripts/maps.js"></script>' +
            '<script async defer ' +
            'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCQZ-jlREcmgiolyPb8qwIKH296-vwdNYI&callback=initMap">' +
            '</script>' +
            '<input type="submit" value="Run again" onclick="location.href=\'/\';"/>' +
            '<input id="submit" type="submit" value="Submit"/>' +
            '<input id="clear" type="button" value="Clear" onclick="clear();" />' +
            '</div>');
    });
}


app.listen(PORT);
