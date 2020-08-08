import express from 'express';

import auth from '../src/middlewares/auth';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const authController = new AuthController();

routes.get('/classes', auth, classesController.index);
routes.post('/classes', auth, classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', auth, connectionsController.create);

routes.post('/register', authController.register);
routes.post('/login', authController.login);

export default routes;