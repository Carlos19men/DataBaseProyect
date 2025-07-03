import { Router } from "express";
import { vehicleModel } from "../models/Vehiculos";
import { VehicleController } from "../controllers/VehiclesController";

export const createVehiclesRouter = () => {
    const VehiclesRouter = Router();
    const vehicleController = new VehicleController(vehicleModel);

    VehiclesRouter.get('/', vehicleController.getAll);
    VehiclesRouter.get('/:plate', vehicleController.getByPlate);
    VehiclesRouter.post('/', vehicleController.newVehicle);
    VehiclesRouter.patch('/', vehicleController.edit);
    VehiclesRouter.delete('/', vehicleController.delete);

    return VehiclesRouter;
}