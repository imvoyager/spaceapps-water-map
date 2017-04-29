const request = require('request');

function getForecast(loc, callback) {
    request('http://samples.openweathermap.org/data/2.5/forecast/daily?lat=' + loc.lat
            + '&lon=' + loc.lon
            + '&cnt=10&appid=b1b15e88fa797225412429c1c50c122a1',
        function(err, res) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, res.body);
        });
}

function getRainValue(loc, callback) {
    getForecast(loc, function(err, forecast) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, 0.16);
    });
}

module.exports = {

    getRainValue: getRainValue
    
};
