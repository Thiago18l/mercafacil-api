import { Router } from 'express';
import { getUser, loginUser, createListOfContacts } from '../controllers';


import { TokenValidation } from '../auth';
const routes = Router();

routes.get('/user', getUser)
routes.post('/login', loginUser)
routes.get('/clientes', TokenValidation, createListOfContacts)
routes.get('/logout', )

export default routes;