import  { Router }                 from 'express';


import UserController              from './app/controllers/UserController'; 
import SessionController           from './app/controllers/SessionController';
import authMiddleware              from './app/middlewares/auth';




const routes    = new Router();


routes.post('/sessions'                 ,SessionController.store);

routes.post('/users/create'             ,UserController.store);
routes.get('/users/retrieve/:id'        ,UserController.show);

routes.use(authMiddleware);

routes.put('/users/update/:id'        ,UserController.update);
routes.delete('/users/delete/:id'        ,UserController.delete);





export default  routes;