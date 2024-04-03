const { Model, DataTypes, Sequelize } = require('sequelize');

//nombre de la tabla
const CATEGORY_TABLE = 'categories';

//estructura de la tabla en la base de datos
const CategorySchema = {
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
  createdAt: {
    //nombre como queremos manipular en javascript
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at', //nombre en la base de datos
    defaultValue: Sequelize.NOW,
  },
};

//extendemos nuestro schema de Model para que se dote de las propiedasdes para manipular en base de datos
class Category extends Model {
  //generamos método statico para generar las asociaciones
  static assocciate(models) {
    this.hasMany(models.Team, {
      as: "teams",
      foreignKey: "categoryId"
    })
  }

  //generamos otro método statico para la configuración
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false, //para que no se cree automaticamente los campos del create_at y update_at
    };
  }
}

//exportamos nombre de la tabla, schema y modelo
module.exports = { CATEGORY_TABLE, CategorySchema, Category };
