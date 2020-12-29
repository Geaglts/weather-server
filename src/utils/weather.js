const request = require("request");

function weather(address, callback) {
    const BASE_URL = "http://api.weatherapi.com/v1/";
    const API_KEY = "d497eaeacffd49c8b9833317201912";
    const LANG = "es";
    const QUERY_URL = `${BASE_URL}current.json?key=${API_KEY}&q=${address}&lang=${LANG}`;

    request({ url: QUERY_URL, json: true }, (error, response) => {
        if (error) {
            return callback(error, null);
        }

        return callback(null, response?.body);
    });
}

module.exports = weather;
