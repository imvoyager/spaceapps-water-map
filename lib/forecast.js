const request = require('request');

function get16DayForecast(loc, callback) {
    request('http://api.openweathermap.org/data/2.5/forecast/daily?'
        + 'lat=' + loc.lat
        + '&lon=' + loc.lon
        + '&cnt=16'
        + '&APPID=e2f9aaade687bdd169b71f6250f1bca2',
        function(err, res, body) {
            if (err) {
                callback(err);
                return;
            }
            if (res.statusCode !== 200) {
                console.error(res.statusCode);
                console.error(body);
                callback(new Error('Non 200 response.'));
                return;
            }
            callback(null, JSON.parse(body));
        });
}

module.exports = {
    
    get16DayForecast: get16DayForecast
    
};
