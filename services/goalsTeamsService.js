const {
  models: { PercentageMatch },
} = require('../libs/sequelize');
const BaseService = require('./baseService');
const { Op, Sequelize } = require('sequelize');

class GoalsTeamsService extends BaseService {
  constructor(params) {
    super();
    this.info = null;
    this.firstTeamId = +params.first_team_id;
    this.secondTeamId = +params.second_team_id;
    this.firstValue = +params.first_value;
    this.secondValue = +params.second_value;
    this.gamesNumber = +params.games_number || 6;
  }

  async getGoalsTeams() {
    const data = await PercentageMatch.findOne({
      where: {
        [Op.or]: [
          Sequelize.literal(
            `(first_team_id = ${this.firstTeamId} AND second_team_id = ${this.secondTeamId})`,
          ),
          Sequelize.literal(
            `(first_team_id = ${this.secondTeamId} AND second_team_id = ${this.firstTeamId})`,
          ),
        ],
      },
    });

    if (data) {
      let infoData = data.dataValues;

      if(this.firstValue && this.secondValue){
        if (this.firstTeamId === infoData.firstTeamId) {
          this.info = {
            goals_first_team:
              infoData.goalsFirstTeam +
              this.firstValue,
            goals_second_team:
              infoData.goalsSecondTeam +
              this.secondValue,
            games_number: infoData.gamesNumber + this.gamesNumber,
          };
        } else {
          this.info = {
            goals_first_team:
              infoData.goalsSecondTeam +
              this.firstValue,
            goals_second_team:
              infoData.goalsFirstTeam +
              this.secondValue,
            games_number: infoData.gamesNumber + this.gamesNumber,
          };
        }
      }else{
        if (this.firstTeamId === infoData.firstTeamId){
          this.info = {
            goals_first_team:
              infoData.goalsFirstTeam,
            goals_second_team:
              infoData.goalsSecondTeam,
            games_number: data.gamesNumber,
          };
        }else{
          this.info = {
            goals_first_team:
              infoData.goalsSecondTeam,
            goals_second_team:
              infoData.goalsFirstTeam,
            games_number: data.gamesNumber,
          };
        }
      }

      super.setAsValid();
    } else {
      if (this.firstValue && this.secondValue) {
        this.info = {
          goals_first_team: this.firstValue,
          goals_second_team: this.secondValue,
          games_number: this.gamesNumber,
        };
        super.setAsValid();
      } else {
        super.setErrors({ message: `Combinación de equipos no encontrada!` });
        super.setAsInvalid();
      }
    }
  }
}

module.exports = GoalsTeamsService;
