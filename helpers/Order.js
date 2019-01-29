const { get } = require("lodash");
const config = require("config");
const fetch = require("node-fetch");

const checkLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const checkLong = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
const mapApiBase = config.get("googleMapApi");
const mapApiKey = config.get("googleMapKey");

const getDistance = async (origin, destination) => {
    try {
        const response = await fetch(`${mapApiBase}origins=${origin.toString()}&destinations=${destination.toString()}&key=${mapApiKey}`);
        const data = await response.json();
        if(get(data, "rows[0].elements[0].status") !== "OK") {
            throw new Error("ZERO_RESULTS");
        }
        return get(data, "rows[0].elements[0].distance.value");
    } catch (err) {
        throw err;
    }
};

const checkLatLong = (lat, lon) => {
    return checkLat.test(lat) && checkLong.test(lon);
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
