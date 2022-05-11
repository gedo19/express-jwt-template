import { Sequelize } from 'sequelize';
import { createNamespace } from 'cls-hooked';

import config from './config/database.js';

const mode = process.env.NODE_ENV || 'development';
const namespace = createNamespace('restAPI');
Sequelize.useCLS(namespace);

export default new Sequelize(config[mode]);
