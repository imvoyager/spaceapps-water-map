const geolib = require('geolib');
const isWater = require('./is_water.js');
const forecast = require('./forecast.js');

function isCloudAt(loc, callback) {
    forecast.get16DayForecast(
        loc,
        function(err, forecast) {
            if (err) {
                callback(err);
                return;
            }
            console.log('Cloud coverage:');
            console.log(forecast.list[0].clouds);
            callback(null, forecast.list[0].clouds > 50);
        });
}

function findRandomCloud(callback) {
    console.log('Trying to find cloud...');
    var lon = (Math.random() * 360) - 180;
    var lat = (Math.random() * 180) - 90;
    var loc = {'lon': lon, 'lat': lat};
    console.log(loc);
    isCloudAt(loc, function(err, cloudThere) {
        if (err) {
            callback(err);
        } else if (!cloudThere) {
            findRandomCloud(callback);
        } else {
            isWater.isWater(loc, function (err, locIsWater) {
                if (err) {
                    callback(err);
                } else if (locIsWater) {
                    findRandomCloud(callback);
                } else {
                    console.log('Happy little cloud.');
                    callback(null, loc);
                }
            });
        }
    });
}

function getNextLocations(day, loc, callback) {
    forecast.get16DayForecast(loc, function(err, forecast) {
        if (err) {
            callback(err);
            return;
        }
        if (forecast.list[day].clouds < 50) {
            callback(null, []);
            return;
        }
        
        var dist = forecast.list[day].speed * 86400; // Seconds in days
        var origDeg = forecast.list[day].deg;
        var deg = origDeg < 180 ? origDeg + 180 : origDeg - 180;
        var newLoc = geolib.computeDestinationPoint(loc, dist, deg);
        var newLocProper = { 'lon': newLoc.longitude, 'lat': newLoc.latitude };
        console.log(loc);
        console.log(newLoc);
        
        if (day > 5) {
            callback(null, [newLocProper]);
            return;
        }
        
        getNextLocations(day + 1, newLocProper, function(err, rest) {
            if (err) {
                callback(err);
                return;
            }
            rest.unshift(newLocProper);
            callback(null, rest);
        });
    });
}

function getCloudLocations(callback) {
    findRandomCloud(function(err, loc) {
        if (err) {
            callback(err);
            return;
        }
        getNextLocations(1, loc, function(err, rest) {
            if (err) {
                callback(err);
                return;
            }
            rest.unshift(loc);
            callback(null, rest);
        });
    });
}

module.exports = {
    
    getCloudLocations: getCloudLocations
    
};
