import express from 'express';

import auth from '../src/middlewares/auth';

import multer from 'multer';
import multerConfig from './config/multer';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';
import RecoveryController from './controllers/RecoveryController';
import UpdateController from './controllers/UpdateController';
import ProfileController from './controllers/ProfileController';
import TeachersController from "./controllers/TeachersController";

const routes = express.Router();
const upload = multer(multerConfig);

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const authController = new AuthController();
const recoveryController = new RecoveryController();
const updateController = new UpdateController();
const profileController = new ProfileController();
const teachersController = new TeachersController();

routes.get('/classes', auth, classesController.index);
routes.post('/classes', auth, classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', auth, connectionsController.create);

routes.get('/teachers', teachersController.index);

routes.post('/register', authController.register);
routes.post('/login', authController.login);

routes.post('/forgot_password', recoveryController.recover);
routes.post('/reset_password', recoveryController.reset);

routes.post('/update', auth, upload.single('avatar'), updateController.update);

routes.post('/profile', auth, profileController.show);

export default routes;