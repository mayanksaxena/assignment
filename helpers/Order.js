const { get } = require("lodash");
const config = require("config");
const distance = require("google-distance");

const ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

distance.apiKey = config.get("googleMapKey");

const getDistance = async (origin, destination) => {
    return new Promise((resolve, reject) => {
        distance.get(
            {
                index: 1,
                origin: origin.toString(),
                destination: destination.toString(),
            },
            (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            }
        );
    });
};

const checkLatLong = (lat, lon) => {
    return ck_lat.test(lat) && ck_lon.test(lon);
};

const errorFormatter = (error) => {
    if (get(error, "output.payload.error")) {
        error.output.payload.error = get(
            error,
            "output.payload.message",
            "UNKNOWN_ERROR"
        );
    }
    return error;
};

module.exports = {
    getDistance,
    checkLatLong,
    errorFormatter,
};
