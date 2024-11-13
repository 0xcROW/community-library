import express from 'express';
import { router } from './src/routes/index.js';
import 'dotenv/config';
import './src/services/cron.service.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});