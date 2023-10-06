import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class VouchersController {   

// ==================================================
//        Inserta un cliente enviando un correo de confirmacion
// ==================================================
public async altaVoucher(req: Request, res: Response) {
    
    const { IdPersona } = req.params;
    const { id_sucursal } = req.params;

    var producto = req.body[0];
    var codigo = req.body[1];
    var stock = req.body[2];
    var precio_compra = req.body[3];
    var precio_venta = req.body[4];
    var observaciones = req.body[5];

    if(codigo == null || codigo == 'null' || codigo == '-' || codigo == '' || codigo == 'undefined' || codigo == undefined)
    {
        codigo = '-';
    }

    if(stock == null || stock == 'null' || stock == '-' || stock == '' || stock == 'undefined' || stock == undefined)
    {
        stock = 0;
    }

    if(precio_compra == null || precio_compra == 'null' || precio_compra == '-' || precio_compra == '' || precio_compra == 'undefined' || precio_compra == undefined)
    {
        precio_compra = 0;
    }

    if(precio_venta == null || precio_venta == 'null' || precio_venta == '-' || precio_venta == '' || precio_venta == 'undefined' || precio_venta == undefined)
    {
        precio_venta = 0;
    }

    if(observaciones == null || observaciones == 'null' || observaciones == '-' || observaciones == '' || observaciones == 'undefined' || observaciones == undefined)
    {
        observaciones = '-';
    }

    
    pool.query(`call bsp_alta_producto('${id_sucursal}','${producto}','${codigo}','${stock}','${precio_compra}','${precio_venta}','${observaciones}')`, function(err: any, result: any, fields: any){

        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })

}
// ==================================================
//        Lista vouchers
// ==================================================
public async listarVouchersPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_vouchers_paginado('${desde}')`, function(err: any, result: any, fields: any){
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
public async baja_voucher(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var IdVoucher = req.params.pIdVoucher;

    pool.query(`call bsp_baja_voucher('${IdPersona}','${IdVoucher}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//   Listado de vouchers
// ==================================================
public async listar_vouchers_paginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    
    var pEstadoVoucher = req.params.estado_voucher || 'T';
    var id_sucursal = req.params.id_sucursal || 1;

    if(pEstadoVoucher == null || pEstadoVoucher == 'null' || pEstadoVoucher == '-' || pEstadoVoucher == '')
    {
        pEstadoVoucher = 'T';
    }

    pool.query(`call bsp_listar_vouchers_paginado('${desde}','${pEstadoVoucher}','${id_sucursal}')`, function(err: any, result: any){
        if(err){
            logger.error("Error en listar_vouchers_paginado - vouchersController");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}

// ==================================================
//        
// ==================================================
public async confirmar_voucher(req: Request, res: Response): Promise<void> {

    var id_transaccion = req.params.id_transaccion;

    pool.query(`call bsp_confirmar_voucher('${id_transaccion}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}



}


const vouchersController = new VouchersController;
export default vouchersController;