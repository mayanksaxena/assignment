const config = require('config');
const Joi = require('joi');
const distance = require('google-distance');
const Order = require('../models/Order');

const ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

distance.apiKey = config.get('googleMapKey');
async function getDistance(origin, destination) {
    return new Promise((resolve, reject) => {
        distance.get({
            index: 1,
            origin: origin.toString(),
            destination: destination.toString()
        },
        (err, data) => {
            if (err) {
                reject(err);
            }
            console.log("Data", data);
            resolve(data);
        });
    });
}

const check_lat_lon = (lat, lon) => {
    return ck_lat.test(lat) && ck_lon.test(lon);
}

const list = async (request, h) => {
    const {
        query: {
            page,
            limit = 10,
        },
    } = request;
    const pageForORM = page ? page - 1 : 0;
    console.log("page", page, limit);
    try {
        const orders = await Order
            .query()
            .context({
                request,
            })
            .page(pageForORM, limit);
            console.log("orders", orders, orders.results.map(
                (item) => item
            ))
        return h.bissle({
            items: {
                results: orders.results.map(
                    (item) => { console.log("item", item); return Joi.validate(item, Order.responseSchema).value;}
                ),
            },
        },
        {
            total: orders.total,
        });
    } catch(err) {
        console.log("err", err);
    }
};

const create = async (request, h) => {
    const { origin, destination } = request.payload;
    if (origin instanceof Array 
        && destination instanceof Array 
        && check_lat_lon(origin[0], origin[1])
        && check_lat_lon(destination[0], destination[1])) {
            console.log("valid cordinates", origin, destination);
            try {
                const { distanceValue } = await getDistance(origin, destination);
                const newOrder = await Order
                    .query()
                    .insertGraph({
                        origin: origin.toString(),
                        destination: destination.toString(),
                        distance: distanceValue,
                        status: 'UNASSIGNED'
                    });
                return { 
                    id: newOrder.id, 
                    status: newOrder.status, 
                    distance: newOrder.distance
                };
            } catch (err) {
                console.log("err", err);
                return err;
            }
    }
    return {
        error: 'INVALID_LAT_LONG'
    };
};

const update = async (request, h) => {
    const { id } = request.params;
    const { status } = request.payload;
    if (status === 'TAKEN') {
        const order = await Order.query().update({ status: 'TAKEN' }).where('id', id).andWhere('status', 'UNASSIGNED');
        if (order) {
            return {
                "status": 'SUCCESS'
            }
        }
        return {
            "error": "ORDER_ALREADY_BEEN_TAKEN"
        };
    }
    return {
        "error": "INVALID_PARAMS"
    };
};

module.exports = {
    create,
    list,
    update,
};