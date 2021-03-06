const forecast = require('./forecast.js');

function getRainValue(loc, callback) {
    forecast.get16DayForecast(
        loc,
        function(err, forecast) {
            if (err) {
                callback(err);
                return;
            }
            var total = 1; // Keeps our ranks between 0 and 1. 
            var items = forecast.list;
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
