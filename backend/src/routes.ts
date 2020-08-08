import express from 'express';

import auth from '../src/middlewares/auth';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';
import RecoveryController from './controllers/RecoveryController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const authController = new AuthController();
const recoveryController = new RecoveryController();

routes.get('/classes', auth, classesController.index);
routes.post('/classes', auth, classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', auth, connectionsController.create);

routes.post('/register', authController.register);
routes.post('/login', authController.login);

routes.post('/forgot_password', recoveryController.recover);
routes.post('/reset_password', recoveryController.reset);

export default routes;