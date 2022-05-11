import User from './User.js';
import Token from './Token.js';

const models = {
  User,
  Token,
};

export default () => {
  Object
    .values(models)
    .forEach((model) => {
      if (model.associate) {
        model.associate(models);
      }
    });
};
