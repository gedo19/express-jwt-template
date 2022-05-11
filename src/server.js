import { createServer } from 'http';
import 'dotenv/config';

import app from './app.js';

const PORT = process.env.PORT || 8000;

createServer(app).listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
