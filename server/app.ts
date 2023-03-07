import express from 'express';
import dotenv from 'dotenv';
import Knex from 'knex';
import cors from 'cors';
import { AuthService } from './services/authServices';
import { AuthController } from './controllers/authControllers';
import { authRoutes } from './routes/authRoutes';
import { ToBuyListController } from './controllers/toBuyListControllers';
import { ToBuyListService } from './services/toBuyListServices';
import { toBuyListRoutes } from './routes/toBuyListRoutes';

dotenv.config();

const knexConfig = require('./knexfile');
const configMode = process.env.NODE_ENV || 'development';
export const knex = Knex(knexConfig[configMode]);

const app = express();

export const authService = new AuthService(knex);
export const authController = new AuthController(authService);

export const toBuyListService = new ToBuyListService(knex);
export const toBuyListController = new ToBuyListController(toBuyListService);

app.use(express.json(), cors());

app.use('/auth', authRoutes());
app.use('/toBuyList', toBuyListRoutes());

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`);
});
