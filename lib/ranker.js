const async = require('async');
const cloudLocations = require('./cloud_locations.js');
const groundWetness = require('./ground_wetness.js');
const rainForecast = require('./rain_forecast.js');

function calcRank(wetness, forecast) {
    return wetness * forecast;
}

function rank() {
    cloudLocations.getCloudLocations(function(err, cloud_path) {
        if (err) {
            console.error(err);
            return;
        }
        async.map(
            cloud_path,
            function(loc, callback) {
                var wetness = groundWetness.getGroundWetness(loc);
                rainForecast.getRainValue(
                    loc,
                    function(err, forecast) {
                        var rank = calcRank(wetness, forecast);
                        
                        callback(null, {'loc': loc, 'rank': rank});
                    }
                );
            }, function (err, output) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(output);
                }
            }
        );
    });
}

module.exports = {
    rank: rank
};
