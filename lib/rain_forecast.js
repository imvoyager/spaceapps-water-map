const request = require('request');

function getRainValue(loc, callback) {
    request('http://api.openweathermap.org/data/2.5/forecast/daily?'
            + 'lat=' + loc.lat
            + '&lon=' + loc.lon
            + '&cnt=16'
            + '&APPID=f7c153e594f390c8f9a7fc0f39f9b64f',
        function(err, res) {
            if (err) {
                callback(err);
                return;
            }
            console.log(res.body);
            console.log('');
            var total = 0.00000001; // Don't want divide by zero errors. 
            var items = JSON.parse(res.body).list;
            for (var i = 0; i < items.length; i++) {
                if (items[i].rain) {
                    total += items[i].rain;
                }
            }
            callback(null, 1 / total);
        });
}

module.exports = {

    getRainValue: getRainValue
    
};
