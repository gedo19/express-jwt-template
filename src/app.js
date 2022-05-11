import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import 'dotenv/config';

import sequelize from './db.js';
import associateModels from './models/index.js';
import useJwtStrategy from './lib/passportStrategies/jwt/index.js';
import router from './routes/index.js';
import errorsMiddleware from './middlewares/errors.middleware.js';

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

useJwtStrategy(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.use('/api', router);
app.use(errorsMiddleware);

try {
  associateModels();
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
} catch (e) {
  console.error(e);
}

export default app;
