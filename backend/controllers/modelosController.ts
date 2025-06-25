import {Request,Response} from 'express'
import { ModelsModel } from '../models/Modelos'


interface Model{
    id_marca:number,
    marca: string,
    id_modelo:number,
    modelo:string,
    oil_box: string,
    oil_motor:string,
    octanaje:string,
    type_refrigerant:string,
    description:string,
    weight: number
    nro_seat:number
}

export class ModelController {

    getAll = async (_req: Request, res: Response<Model[] | { message: string } | {error:string}>): Promise<void> => {
        try{
            const models:Model[] = await ModelsModel.getAll()

            if(!models){
                res.status(404).json({error:'Modelos no encontrados'})
                return
            }
            res.status(200).send(models)
            return
        }catch (err){
            console.log(err)
            res.status(500).json({error:'internal error server'+err})
            return
        }
    }

    getById = async (req: Request, res: Response<Model | { message: string } | {error:string}>): Promise<void> => {
        const {id_marca, id_modelo} = req.params

        try{
            const model:Model = await ModelsModel.getById(parseInt(id_marca),parseInt(id_modelo))

            if(!model){
                res.status(404).json({error:'Modelo no econetrado'})
                return 
            }

            res.status(200).send(model)
            return
        }catch (err){
            console.log(err)
            res.status(500).json({error:'Internal server error' + err})
            return 
        }
    }

    getByMarca = async (req: Request, res: Response<Model[] | { message: string } | {error:string}>): Promise<void> => {
        const {id_marca} = req.params

        try{
            const models = await ModelsModel.getByMarca(parseInt(id_marca))

            if(!models){
                res.status(404).json({error:'Modelos no encontrados'})
                return
            }
            res.status(200).send(models)
        }catch (err){
            console.log(err)
            res.status(500).json({error:'Internal server error' + err})
            return 
        }
    }
    /*
    create = async (req: Request, res: Response< { message: string } | {error:string}>): Promise<void> => {
        const {id_marca,nombre,aceite_caja,aceite_motor,octanaje,tipo_refrigerante,descripcion,peso,nro_puestos} = req.body

        try{
            const resutl = await ModelsModel.createModel({id_marca,nombre,aceite_caja,aceite_motor,octanaje,tipo_refrigerante,peso,descripcion,nro_puestos})
        }
    }
    */
}