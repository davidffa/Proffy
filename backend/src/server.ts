require('dotenv').config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);