import { Request, Response, Router } from 'express';

const routes = Router();

/**
 * rota default da aplicação
 */
routes.get("/", (req: Request, res: Response) => {
    res.json({'message': 'mercafacil api'});
});


export default routes;