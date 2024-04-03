const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./categoryModel');

const TEAM_TABLE = 'teams';

const TeamSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  // successPercGoalsUp: {
  //   type: DataTypes.DECIMAL(4, 1),
  //   allowNull: true,
  //   field: 'success_perc_goals_up',
  //   defaultValue: null,
  // },
  successPercGoalsDown: {
    type: DataTypes.DECIMAL(4, 1),
    allowNull: true,
    field: 'success_perc_goals_up',
    defaultValue: null,
  },
  categoryId: {
    allowNull: false,
    field: 'category_id',
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Team extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId',
    });
    this.hasMany(models.Match, {
      foreignKey: 'firstTeamId',
      as: 'firstTeamMatches',
    });
    this.hasMany(models.Match, {
      foreignKey: 'secondTeamId',
      as: 'secondTeamMatches',
    });
    this.hasMany(models.PercentageMatch, {
      foreignKey: 'firstTeamId',
      as: 'firstTeamPercentage',
    });
    this.hasMany(models.PercentageMatch, {
      foreignKey: 'secondTeamId',
      as: 'secondTeamPercentage',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TEAM_TABLE,
      modelName: 'Team',
    };
  }
}

module.exports = { TEAM_TABLE, TeamSchema, Team };
