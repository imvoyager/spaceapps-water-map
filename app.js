const express = require('express');
const path = require('path');
const ranker = require('./lib/ranker.js');


const app = express();


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res, next) {
    ranker.rank(function(err, ranks) {
        if (err) {
            next(err);
            return;
        }
        var highest = ranks.reduce(function(prev, ele) {
            return ele.rank > prev.rank ? ele : prev;
        }, {'rank': 0});
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
            'var highest = ' + JSON.stringify(highest) + ';' +
            '</script>' +
            '<script async defer ' +
            'src="/assets/javascript/maps.js"></script>' +
            '<script async defer ' +
            'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCQZ-jlREcmgiolyPb8qwIKH296-vwdNYI&callback=initMap">' +
            '</script>' +
            '</div>');
    });
});


app.listen(3000);
