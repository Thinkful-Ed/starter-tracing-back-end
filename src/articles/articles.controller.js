const service = require("./articles.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "body must have data property" });
}

function dataHas(propertyName) {
  return (request, response, next) => {
    const { data = {} } = request.body;
    const value = data[propertyName];
    if (value) {
      return next();
    }
    next({ status: 400, message: `Article must include a ${propertyName}` });
  };
}

const hasTitle = dataHas("title");
const hasUrl = dataHas("url");
const hasSummary = dataHas("summary");

async function create(req, res) {
  const newObservation = await service.create(req.body.data);
  res.status(201).json({
    data: newObservation,
  });
}

async function list(req, res) {
  const data = await service.list();
  res.json({
    data,
  });
}

module.exports = {
  create: [hasData, hasTitle, hasUrl, hasSummary, asyncErrorBoundary(create)],
  list: asyncErrorBoundary(list),
};
