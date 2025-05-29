import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class BeeAcount extends Model {
    static associate(models) {
      // define association here
    }
  }

  BeeAcount.init({
    Email: DataTypes.INTEGER,
    UserName: DataTypes.TEXT,
    PassWord: DataTypes.TEXT,
    Role: DataTypes.TEXT,
    Age: DataTypes.INTEGER,
    SDT: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BeeAcount',
  });

  return BeeAcount;
};
