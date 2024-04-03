const soccerRouter = require('./soccerRouter');

const routerApi = (app) => {
  app.use('/sports/soccer', soccerRouter);
};

module.exports = routerApi;
