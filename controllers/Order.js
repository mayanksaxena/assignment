const Joi = require("joi");
const Boom = require("boom");
const Order = require("../models/Order");
const { getDistance, checkLatLong } = require("../helpers/Order");

const list = async (request, h) => {
  const {
    query: { page, limit = 10 }
  } = request;
  const pageForORM = page ? page - 1 : 0;
  try {
    const orders = await Order.query()
      .context({
        request
      })
      .page(pageForORM, limit);
    return h.bissle(
      {
        items: {
          results: orders.results.map(
            item => Joi.validate(item, Order.responseSchema).value
          )
        }
      },
      {
        total: orders.total
      }
    );
  } catch (err) {
    return Boom.badImplementation(err);
  }
};

const create = async (request, h) => {
  const { origin, destination } = request.payload;
  if (
    origin instanceof Array &&
    destination instanceof Array &&
    checkLatLong(origin[0], origin[1]) &&
    checkLatLong(destination[0], destination[1])
  ) {
    try {
      const { distanceValue } = await getDistance(origin, destination);
      const newOrder = await Order.query().insertGraph({
        origin: origin.toString(),
        destination: destination.toString(),
        distance: distanceValue,
        status: "UNASSIGNED"
      });
      return {
        id: newOrder.id,
        status: newOrder.status,
        distance: newOrder.distance
      };
    } catch (err) {
      return Boom.badImplementation(err);
    }
  }
  return Boom.badRequest("INVALID_LAT_LONG");
};

const update = async (request, h) => {
  const { id } = request.params;
  const { status } = request.payload;
  if (status === "TAKEN") {
    const order = await Order.query()
      .update({ status: "TAKEN" })
      .where("id", id)
      .andWhere("status", "UNASSIGNED");
    if (order) {
      return {
        status: "SUCCESS"
      };
    }
    return Boom.forbidden("ORDER_ALREADY_BEEN_TAKEN");
  }
  return Boom.badRequest("INVALID_PARAMS");
};

module.exports = {
  create,
  list,
  update
};
