import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { mysql_pool } from '../database';
import { RowDataPacket } from 'mysql2/promise';

interface IBody {
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

interface IResult extends RowDataPacket {
    id: number;
    name: string;
    password: string;
}

export const create_User = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, password }: IFormUser = req.body;
        const response = await mysql_pool.promise().query(
            `INSERT INTO users (name, password) values ('${name}', '${password}')`
        );
        console.log(response);
        return res.status(201).send({ message: "user created" });
    } catch (e) {
        return res.status(500).json("Error")
    }
}

export const get_Users = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await mysql_pool.promise().query(`SELECT * FROM users`);
        return res.status(200).send(users);
    } catch (e) {
        return res.status(401).send({ message: e });
    }
}

export const login_User = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, password }: IBody = req.body;
        const [rows] = await mysql_pool.promise().query<IResult[]>(`
            SELECT id, name, password FROM users WHERE name = '${name}' and password = '${password}'`
            );
        if (name === rows[0].name && password === rows[0].password) {
            const token = jwt.sign({ id: rows[0].id }, 'IMAGINARYTOKEN', { expiresIn: 300 });
            return res.status(200).send({ auth: true, token: token })
        }
        return res.status(500).send("Login inválido!")
    } catch (e) {
        return res.status(401).json(`Login inválido`);
    }
}

export const create_contacts = async (req: Request, res: Response): Promise<Response> => {
    try {
        let { name, cellphone }: IContacts = req.body;
        name = name.toUpperCase();
        if (name !== undefined && cellphone !== undefined) {
            const result = await mysql_pool.promise().query(
                `INSERT INTO contacts (nome, celular) VALUES ('${name}', '${cellphone}')`
            );
            console.log(result);
            return res.status(201).send({ message: "contact created" });
        }
        return res.status(401).send();
    } catch (e) {
        return res.status(401).send({ message: e })
    }
}