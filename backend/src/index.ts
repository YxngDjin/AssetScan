import express from 'express';
import type { Request, Response } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './config/logger.js';
import categoryRouter from './modules/routes/categories.router.js';
import itemRouter from './modules/routes/items.router.js';

const PORT = process.env.PORT || 3002;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan('combined', {
    stream: { write: (message: string) => logger.info(message.trim()) },
  })
);

app.use('/api/categories', categoryRouter);
app.use('/api/items', itemRouter);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/health', (_req: Request, res: Response) => {
  res.send('Healthy');
});

app.listen(PORT, () => {
  logger.info(`Server runnig on http://localhost:${PORT}`);
});
