const { Category, CategorySchema } = require('./categoryModel');
const { Team, TeamSchema } = require('./teamModel');
const { Match, MatchSchema } = require('./matchModel');
const {
  PercentageMatch,
  PercentageMatchSchema,
} = require('./percentageMatchModel');

const setupModels = (sequelize) => {
  Category.init(CategorySchema, Category.config(sequelize));
  Team.init(TeamSchema, Team.config(sequelize));
  Match.init(MatchSchema, Match.config(sequelize));
  PercentageMatch.init(
    PercentageMatchSchema,
    PercentageMatch.config(sequelize),
  );

  Team.associate(sequelize.models);
  Category.assocciate(sequelize.models);
  Match.associate(sequelize.models);
  PercentageMatch.associate(sequelize.models);
};

module.exports = setupModels;
