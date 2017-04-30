var xml2js = require('xml2js');
var fs = require('fs');
var request = require('request');

var parser = new xml2js.Parser();
//we need to make a request to NASAs groundwater soil moisture archive data
//download an XML file (or several to compare data sets)
var groundWetness = -1;

exports.PND = parseNasaData();

function parseNasaData() {
  var xmlData = "";

var nasaXml = request(
  'https://hydro1.gesdisc.eosdis.nasa.gov/data/GRACEDA/GRACEDADM_CLSM0125US_7D.2.0/2016/GRACEDADM_CLSM0125US_7D.A20161003.020.nc4.xml',
function (err, response, body) {
  xmlData = body;
  console.log(xmlData);
});

//parse this file into json

fs.readFile(xmlData, function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
});
}


//get ground wetness from JSON?

function getGroundWetness(loc) {
    return groundWetness;
}

exports.getGroundWetness = getGroundWetness();
