import express from 'express';

import auth from '../src/middlewares/auth';

import multer from 'multer';
import multerConfig from './config/multer';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';
import RecoveryController from './controllers/RecoveryController';
import UpdateController from './controllers/UpdateController';

const routes = express.Router();
const upload = multer(multerConfig);

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const authController = new AuthController();
const recoveryController = new RecoveryController();
const updateController = new UpdateController();

routes.get('/classes', auth, classesController.index);
routes.post('/classes', auth, classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', auth, connectionsController.create);

routes.post('/register', authController.register);
routes.post('/login', authController.login);

routes.post('/forgot_password', recoveryController.recover);
routes.post('/reset_password', recoveryController.reset);

routes.post('/update', auth, upload.single('image'), updateController.update);

export default routes;