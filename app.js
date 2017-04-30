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
    ranker.rank(function(err, ranks) {
        if (err) {
            next(err);
            return;
        }
        var highest = ranks.reduce(function(prev, ele) {
            return ele.rank > prev.rank ? ele : prev;
        }, {'rank': 0});
        var highestIndex = ranks.indexOf(highest);
        console.log('JJJJJJ');
        console.log(ranks);
        console.log(highest);

        res.send('<html>' +
            '<head>' +
            '<style>' +
            '#map { height: 400px; width: 100%;}' +
            '</style>' +
            '</head>' +
            '<body><h3>My Google Maps Demo</h3>' +
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
            '<form method="post" action="/">' +
            '<input type="submit" value="Run again"/>' +
            '</form>' +
            '</div>');
    });
}


app.listen(PORT);
