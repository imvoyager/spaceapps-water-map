/**
 * Created by KNYordanov on 29.4.2017 г..
 */
var gmaps = require('google-maps');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(3000);
