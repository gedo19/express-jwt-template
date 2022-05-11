import { DataTypes, Model } from 'sequelize';

import sequelize from '../db.js';
import { compare, hashPassword } from '../lib/secure.js';

class User extends Model {
  static associate(models) {
    this.hasOne(models.Token);
  }

  authenticate(password) {
    return compare(password, this.password);
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword,
  },
  sequelize,
  modelName: 'user',
});

export default User;
