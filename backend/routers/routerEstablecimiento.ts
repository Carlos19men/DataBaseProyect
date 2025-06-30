import { Router } from 'express'; 
import { establishmentsModel } from '../models/Establecimientos';
import { EstablishmentController } from '../controllers/EstablecimientosController';

export const createEstablishmentRouter = () => {

    const establishmentRouter = Router();

    const establishmentController = new EstablishmentController(establishmentsModel)

    // Get all establishments
    establishmentRouter.get('/', establishmentController.getAll);

    // Get establishment by RIF
    establishmentRouter.get('/:RIF', establishmentController.getByRIF);

    // Create establishment
    establishmentRouter.post('/', establishmentController.add);

    // deleted
    establishmentRouter.delete('/:RIF', establishmentController.delete);

    //update 
    establishmentRouter.patch('/', establishmentController.edit);

    // Assign person in charge
    establishmentRouter.patch('/assign-person-in-charge', establishmentController.assignPersonInCharge);

    // Remove person in charge
    establishmentRouter.patch('/remove-person-in-charge/:RIF', establishmentController.removePersonInCharge);

    return establishmentRouter;
}