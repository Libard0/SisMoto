import { Router } from 'express';
import calificacionController from '../controllers/calificacionController';

class CalificacionRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', calificacionController.list);
        // this.router.get('/:id', calificacionController.listOne);
        this.router.post('/', calificacionController.create);
        // this.router.put('/:id', calificacionController.update);
        // this.router.delete('/:id', calificacionController.delete);
    }
}
const calificacionRoutes = new CalificacionRoutes();
export default calificacionRoutes.router;