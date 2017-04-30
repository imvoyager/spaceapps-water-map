const jimp = require('jimp');

function isWater(loc, callback) {
    jimp.read('http://maps.googleapis.com/maps/api/staticmap' +
        '?scale=2' +
        '&center=' + loc.lat + ',' + loc.lon +
        '&zoom=13' +
        '&size=1x1' +
        '&sensor=false' +
        '&visual_refresh=true' +
        '&style=feature:water|color:0x00FF00' +
        '&style=element:labels|visibility:off' +
        '&style=feature:transit|visibility:off' +
        '&style=feature:poi|visibility:off' +
        '&style=feature:road|visibility:off' +
        '&style=feature:administrative|visibility:off')
        .then(function(img) {
            var colour = img.getPixelColor(0, 0);
            switch(colour) {
                case 16711935:
                    console.log('Water');
                    callback(null, true);
                    break;
                case 4025213951:
                    console.log('Land');
                    callback(null, false);
                    break;
                case 0:
                    console.log('Off the map..');
                    callback(null, true);
                    break;
                default:
                    callback(new Error('Bad value: ' + colour));
            }
        }, callback);
}

module.exports = {

    isWater: isWater

};
