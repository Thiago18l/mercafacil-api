import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { pg_pool } from '../database';
import { QueryResult } from 'pg';

interface IBody {
    name: string;
    password: string;
}

interface IData {
    id: number;
    name: string;
    password: string;
}

interface IContacts {
    name: string;
    cellphone: string;
}

interface IFormUser {
    name: string;
    password: string;
}


export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, password }: IFormUser = req.body;
        const response: QueryResult = await pg_pool.query(
            `INSERT INTO users (name, password) values ('${name}', '${password}')`
        );
        console.log(response.rows);
        return res.status(201).send({ message: "user created" });
    } catch (e) {
        return res.status(500).json("Error")
    }
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pg_pool.query(`SELECT * FROM users`);
        return res.status(200).send(response.rows);
    } catch (e) {
        return res.status(401).send({ message: e })
    }
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, password }: IBody = req.body;
        const response: QueryResult = await pg_pool.query(`
            SELECT id, name, password FROM users WHERE name = '${name}' and password = '${password}'`
        );
        const data: IData[] = response.rows;
        if (name === data[0].name && password === data[0].password) {
            const token = jwt.sign({ id: data[0].id }, 'IMAGINARYTOKEN', { expiresIn: 300 });
            return res.status(200).send({ auth: true, token: token})
        }
        return res.status(500).send("Login inválido!")
    } catch (e) {
        return res.status(401).json(`Login inválido`);
    }
}


export const createListOfContacts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, cellphone }: IContacts = req.body;
        const result: QueryResult = await pg_pool.query(
            `INSERT INTO contacts (nome, celular) VALUES ('${name}', '${cellphone}')`
        );
        return res.status(201).send({ message: "Contact created"});
    } catch (e) {
        return res.status(500).send(`${e}`);
    }
}


/**
 * Logout
 */
export const logout =  (req: Request, res: Response) => {
    try {
        return res.status(200).send({ auth: false, token: null })
    } catch (e) {
        return res.status(500).end();
    }
}