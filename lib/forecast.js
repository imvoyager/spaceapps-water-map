const request = require('request');

function get16DayForecast(loc, callback) {
    request('http://api.openweathermap.org/data/2.5/forecast/daily?'
        + 'lat=' + loc.lat
        + '&lon=' + loc.lon
        + '&cnt=16'
        + '&APPID=f7c153e594f390c8f9a7fc0f39f9b64f',
        function(err, res, body) {
            if (err) {
                callback(err);
                return;
            }
            callback(null, JSON.parse(body));
        });
}

module.exports = {
    
    get16DayForecast: get16DayForecast
    
};
