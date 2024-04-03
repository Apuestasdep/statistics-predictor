const { Model, DataTypes, Sequelize } = require('sequelize');

const MATCH_TABLE = 'matches';

const MatchSchema = {
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
  goalsFirstTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'goals_first_team',
  },
  goalsSecondTeam: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'goals_first_team',
  },
  winner: {
    allowNull: false,
    type: DataTypes.ENUM('firstTeam', 'secondTeam', 'draw'),
  },
};

class Match extends Model {
  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: 'firstTeamId', as: 'firstTeam' });
    this.belongsTo(models.Team, {
      foreignKey: 'secondTeamId',
      as: 'secondTeam',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MATCH_TABLE,
      modelName: 'Match',
    };
  }
}

module.exports = { MATCH_TABLE, MatchSchema, Match };
