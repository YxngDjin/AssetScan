import express, { Request, Response} from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from "cookie-parser";
import logger from './config/logger.js';


dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    morgan('combined', {
        stream: { write: (message: string) => logger.info(message.trim())}
    })
)

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
})

app.get("/health", (_req: Request, res: Response) => {
    res.send("Healthy");
})

app.listen(3001, () => {
    console.log('Server started on port 3001');
});