import { Router } from "express";
import { vehicleModel } from "../models/Vehiculos";
import { VehicleController } from "../controllers/VehiclesController";

export const createVehiclesRouter = () => {
    const VehiclesRouter = Router();
    const vehicleController = new VehicleController(vehicleModel);

    VehiclesRouter.get('/', vehicleController.getAll);
    VehiclesRouter.get('/:code', vehicleController.getByPlate);
    VehiclesRouter.post('/', vehicleController.newVehicle);
    VehiclesRouter.patch('/:code', vehicleController.edit);
    VehiclesRouter.delete('/:code', vehicleController.delete);

    return VehiclesRouter;
}