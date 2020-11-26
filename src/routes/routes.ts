import { Router } from 'express';
import { createUser, getUsers, loginUser, createListOfContacts, logout} from '../controllers';
import { create_User, login_User, get_Users, create_contacts} from '../controllers';
import { TokenValidation } from '../auth';
const routes = Router();


/**
 * Rotas para o varejão
 */
routes.get('/user/varejao', getUsers);
routes.post('/user/varejao', createUser);
routes.post('/login/varejao', loginUser);
routes.post('/clientes/varejao', TokenValidation, createListOfContacts);
routes.get('/logout/varejao', logout);

/**
 * Rotas para o macapa
 */
routes.get('/user/macapa', get_Users);
routes.post('/user/macapa', create_User);
routes.post('/macapa/login', login_User);
routes.post('/macapa/clientes', TokenValidation, create_contacts);
routes.get('/macapa/logout', logout);

export default routes;