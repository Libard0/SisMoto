import {Request, Response } from 'express';

class IndexController {

    public index (req: Request, res: Response) {
        res.send('Hola')
    }
}

export const indexcontroller = new IndexController();