import { Request, Response } from 'express';
import { phonesCustomerModel } from '../models/Telefonos';

interface Phones {
    telefono: string;
    CI_empleado: string;
}

export class PhonesController {
    model: phonesCustomerModel;

    constructor(model: phonesCustomerModel) {
        this.model = model;
    }

    getAll = async (_req: Request, res: Response<Phones[] | { message: string }>): Promise<void> => {
        try {
            const phones: Phones[] = await phonesCustomerModel.getAll();

            if (!phones || phones.length === 0) {
                res.status(404).json({ "message": "No se encontraron teléfonos" });
                return;
            }

            res.status(200).json(phones);
            return;
        } catch (error) {
            console.error("Error al obtener teléfonos", error);
            res.status(500).json({ message: "Error interno del servidor al encontrar teléfonos" });
            return;
        }
    }

    getById = async (req: Request, res: Response<Phones | { message: string }>): Promise<void> => {
        const { CI } = req.params;

        if (!CI || CI.length === 0) {
            res.status(400).json({ "message": "Se requiere un ID válido del teléfono" });
            return;
        }

        try {
            const phone_data: Phones = await phonesCustomerModel.getByCI(CI);

            if (!phone_data) {
                res.status(404).json({ message: "No se encontró un teléfono con ese ID" });
                return;
            }

            res.status(200).json(phone_data);
            return;
        } catch (error) {
            console.error("Error al obtener el teléfono con ese ID", error);
            res.status(500).json({ message: "Error interno del servidor al conseguir un teléfono" });
            return;
        }
    }

    newPhones(req: Request, res: Response<{ message: string }>): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const { CI, num1, num2 } = req.body;

            if (!CI || CI.length === 0) {
                res.status(400).json({ message: "Se requiere la cédula del cliente" });
                return;
            }

            if (!num1 || num1.length === 0) {
                res.status(400).json({ message: "Se requiere el primer número de teléfono" });
                return;
            }

            if (!num2 || num2.length === 0) {
                res.status(400).json({ message: "Se requiere el segundo número de teléfono" });
                return;
            }

            try {
                const result = await phonesCustomerModel.newPhones({ CI, num1, num2 });

                if (!result) {
                    res.status(404).json({ message: "No se pudo guardar el telefono" });
                    return;
                }

                res.status(201).json({ message: "Teléfonos registrados correctamente" });
                resolve();
            } catch (error) {
                console.error("Error al registrar los teléfonos", error);
                res.status(500).json({ message: "Error interno del servidor al registrar los teléfonos" });
                reject(error);
            }
        });
    }

    editPhone = async (req: Request, res: Response<{ message: string }>): Promise<void> => {
        const { CI, num, newNum } = req.body;

        if (CI.length === 0) {
            res.status(400).json({ message: "Se requiere la cédula del cliente" });
            return;
        }

        if (num.length === 0) {
            res.status(400).json({ message: "Se requiere el número de teléfono actual" });
            return;
        }

        if (newNum.length === 0) {
            res.status(400).json({ message: "Se requiere el nuevo número de teléfono" });
            return;
        }

        try {
            const result = await phonesCustomerModel.editPhone({ CI, num, newNum });

            if (!result) {
                res.status(404).json({ message: "No se pudo actualizar el teléfono" });
                return;
            }

            res.status(200).json({ message: "Teléfono actualizado correctamente" });
        } catch (error) {
            console.error("Error al actualizar el teléfono", error);
            res.status(500).json({ message: "Error interno del servidor al actualizar el teléfono" });
        }
    }
}