import { DataTypes, Model } from 'sequelize';

import sequelize from '../db.js';

class Token extends Model {
  static associate(models) {
    this.belongsTo(models.User);
  }
}

Token.init({
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'token',
})


export default Token;
