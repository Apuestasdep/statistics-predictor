const {
  models: { Category },
} = require('../libs/sequelize');
const BaseService = require('./baseService');

class CategoryService extends BaseService {
  async create(name) {
    const [category, created] = await Category.findOrCreate({
      where: { name },
      defaults: { name },
    });

    if (created) {
      super.setAsValid();
    } else {
      super.setErrors({ message: `La categoría ${name} ya existe` });
      super.setAsInvalid();
    }

    return category;
  }
}

module.exports = CategoryService;
