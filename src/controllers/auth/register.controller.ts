import { Request, Response } from 'express';

export function registerController(req: Request, res: Response) {
    try {
        const { name, email, password, repeatPassword } = req.body;

        res.json({ name, email, password, repeatPassword });
    } catch (err) {
        console.log(err);
    } finally {
        console.log('finally');
    }
}
