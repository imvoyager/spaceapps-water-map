/**
 * Created by KNYordanov on 29.4.2017 г..
 */
var Formats = require('oada-formats');

var formats = new Formats();
formats.use(require('your-favorite-model=package'));

formats
    .model('application/vnd.oada.bookmarks.1+json')
    .then(function(model) {
        return model.validate(model.example());
    })
    .then(/* success */)
    .catch(Format.ValidationError, function(error) {
        console.log(error.errors);
    });