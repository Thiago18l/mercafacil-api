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

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pg_pool.query("SELECT id, nome FROM contacts")
        return res.status(200).json(response.rows)
    } catch (e) {
        return res.status(500).json("Error")
    }
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, password }: IBody = req.body;
        const response: QueryResult = await pg_pool.query("SELECT id, name, password FROM users");
        const data: IData[] = response.rows;
        if (name === data[0].name && password === data[0].password) {
            const token = jwt.sign({ id: data[0].id }, 'IMAGINARYTOKEN', { expiresIn: 300 });
            return res.status(200).send({ auth: true, token: token})
        }
        return res.status(500).send("Login inválido!")
    } catch (e) {
        return res.status(401).json(`Error ${e}`);
    }
}


export const createListOfContacts = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, cellphone }: IContacts = req.body;
        console.log(name, cellphone);
        const result: QueryResult = await pg_pool.query(
            `INSERT INTO contacts (nome, celular) VALUES ('${name}', '${cellphone}')`
        );
        console.log(result.rows)
        return res.status(201).send({ message: "Contact created"});
    } catch (e) {
        return res.status(500).send(`${e}`);
    }
}
