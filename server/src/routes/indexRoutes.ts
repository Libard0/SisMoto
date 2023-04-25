import { Router } from 'express';
import { indexcontroller } from '../controllers/indexController';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', indexcontroller.index);
    }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
