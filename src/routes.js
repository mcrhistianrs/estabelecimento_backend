import  { Router }                 from 'express';


import UserController              from './app/controllers/UserController'; 






const routes    = new Router();




routes.post('/users/create'             ,UserController.store);
routes.get('/users/retrieve/:id'        ,UserController.show);
// routes.put('/users/update/:id'        ,UserController.update);
routes.delete('/users/delete/:id'        ,UserController.delete);





export default  routes;