import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class CajaController {   

// ==================================================
//        
// ==================================================
public async listar_movimientos_caja(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    
    var id_sucursal = req.params.pIdSucursal;


    pool.query(`call bsp_listar_movimientos_caja('${desde}','${id_sucursal}')`, function(err: any, result: any, fields: any){

        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async apertura_caja(req: Request, res: Response): Promise<void> {

    var pIdPromocion = req.params.IdPromocion;

    pool.query(`call bsp_publicar_promocion('${pIdPromocion}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async cierre_caja(req: Request, res: Response): Promise<void> {

    var pIdPromocion = req.params.IdPromocion;

    pool.query(`call bsp_publicar_promocion('${pIdPromocion}')`, function(err: any, result: any){

        if(err || result[0][0].mensaje !== 'Ok'){
            return res.status(200).json({
                ok: false,
                mensaje: result[0][0].mensaje
            });
        }
        
        res.status(200).json(result);
    })
}


}


const productosController = new CajaController;
export default productosController;