const { Model, DataTypes } = require('sequelize');

const PERCENTAGE_MATCH_TABLE = 'percentage_matches';

const PercentageMatchSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'first_team_id',
  },
  secondTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'second_team_id',
  },
  successPercUpMatch: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    field: 'success_perc_up_match',
    defaultValue: null,
  },
  successPercDownMatch: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    field: 'success_perc_down_match',
    defaultValue: null,
  },
  percFirstTeamWinner: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    field: 'perc_first_team_winner',
    defaultValue: null,
  },
  percSecondTeamWinner: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    field: 'perc_second_team_winner',
    defaultValue: null,
  },
  percDraw: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    field: 'perc_draw',
    defaultValue: null,
  },
  gamesNumber: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'games_number',
  },
  goalsFirstTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'goals_first_team',
  },
  goalsSecondTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'goals_second_team',
  },
  successPercUpFirstTeam: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    defaultValue: null,
    field: 'success_perc_up_first_team',
  },
  successPercDownFirstTeam: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    defaultValue: null,
    field: 'success_perc_down_first_team',
  },
  successPercUpSecondTeam: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    defaultValue: null,
    field: 'success_perc_up_second_team',
  },
  successPercDownSecondTeam: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    defaultValue: null,
    field: 'success_perc_down_second_team',
  },
};

class PercentageMatch extends Model {
  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: 'firstTeamId', as: 'firstTeam' });
    this.belongsTo(models.Team, {
      foreignKey: 'firstTeamId',
      as: 'secondTeam',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PERCENTAGE_MATCH_TABLE,
      modelName: 'PercentageMatch',
    };
  }
}

module.exports = {
  PERCENTAGE_MATCH_TABLE,
  PercentageMatchSchema,
  PercentageMatch,
};
