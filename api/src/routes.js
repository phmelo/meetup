import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import SignedUpMeetupController from './app/controllers/SignedUpController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.post('/meetups', MeetupController.store);
routes.get('/meetups', MeetupController.index);
routes.get('/meetups/:id', MeetupController.indexById);
routes.put('/meetups', MeetupController.update);
routes.delete('/meetups', MeetupController.delete);
routes.delete('/meetups/:id', MeetupController.delete);

routes.post('/meetup/subscribe/:id', SignedUpMeetupController.store);
routes.delete('/meetup/unsubscribe/:id', SignedUpMeetupController.delete);
routes.get('/signedupmeetups', SignedUpMeetupController.index);
routes.delete('/signedupmeetups', SignedUpMeetupController.delete);

export default routes;
