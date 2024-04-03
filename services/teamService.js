const {
  models: { Team, Category },
} = require('../libs/sequelize');
const BaseService = require('./baseService');

class TeamService extends BaseService {
  async create(name, category_id) {
    const hasCategory = await this.validateHasCategory(category_id);

    if (hasCategory) {
      const [team, created] = await Team.findOrCreate({
        where: { name, categoryId: hasCategory.id },
        defaults: { name, categoryId: hasCategory.id },
      });

      if (created) {
        super.setAsValid();
      } else {
        super.setErrors({ message: `El equipo ${name} ya existe!` });
        super.setAsInvalid();
      }

      return team;
    } else {
      super.setErrors({
        message: `La categoría enviada no existe, por favor crearla antes de crear el equipo!`,
      });
      super.setAsInvalid();
    }
  }

  async validateHasCategory(category_id) {
    const hasCategory = await Category.findByPk(category_id);
    return hasCategory;
  }
}

module.exports = TeamService;
