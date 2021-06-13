import  { Router }                 from 'express';


import UserController               from './app/controllers/UserController'; 
import EstabelecimentoController    from './app/controllers/EstabelecimentoController';
import SessionController            from './app/controllers/SessionController';
import authMiddleware               from './app/middlewares/auth';




const routes    = new Router();


routes.post('/sessions'                         ,SessionController.store);

routes.post('/users/create'                     ,UserController.store);
routes.get('/users/retrieve/:id'                ,UserController.show);

routes.use(authMiddleware);

routes.put('/users/update/:id'                  ,UserController.update);
routes.delete('/users/delete/:id'               ,UserController.delete);


routes.post('/estabelecimento/create'           ,EstabelecimentoController.create);
routes.get('/estabelecimento/retrieve/:id'      ,EstabelecimentoController.retrieve);
routes.put('/estabelecimento/retrieve/:id'      ,EstabelecimentoController.update);
routes.delete('/estabelecimento/delete/:id'   ,EstabelecimentoController.delete);
routes.get('/estabelecimento/search'            ,EstabelecimentoController.search);






export default  routes;