import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class VentasController {

// ==================================================
//        Lista las ventas entre un rango de fechas
// ==================================================
public async listarUsuariosPaginado(req: Request, res: Response): Promise<void> {
    var desde = req.query.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_usuarios_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.json(result);
    })
}


// ==================================================
//        Lista los ingresos
// ==================================================

public async listarVentas(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var fecha_inicio = req.params.FechaInicio;
    var fecha_fin = req.params.FechaFin;
    var pIdSucursal = req.params.pIdSucursal;
    var pTurno = req.params.pTurno;
        
    if(pTurno == 'manana')
    {
        fecha_inicio = fecha_inicio + " 09:00:00";
        fecha_fin = fecha_fin + " 15:00:00";
    }else{
        if (pTurno == 'tarde'){ 
                fecha_inicio = fecha_inicio + " 15:00:00";
                fecha_fin = fecha_fin + " 21:00:00";
            }else{
                fecha_inicio = fecha_inicio + " 00:00:01";
                fecha_fin = fecha_fin + " 23:59:59";
            }
    }


    pool.query(`call bsp_listar_transacciones_fecha_sucursal('${desde}','${fecha_inicio}','${fecha_fin}','${pIdSucursal}')`, function(err: any, result: any, fields: any){

       if(err){
        res.status(404).json(err);
           return;
       }
       res.json(result);
   })

}


// ==================================================
//        Lista 
// ==================================================

public async listarVentasIdUsuario(req: Request, res: Response): Promise<void> {

    var desde = req.params.pDesde || 0;
    desde  = Number(desde);
    var pFecha = req.params.pFecha;
    var pIdPersona = req.params.pIdPersona;


    pool.query(`call bsp_listar_ventas_idusuario('${desde}','${pFecha}','${pIdPersona}')`, function(err: any, result: any, fields: any){
       if(err){
            res.status(404).json(err);
           return;
       }
       res.json(result);
   })

}

// ==================================================
//         
// ==================================================
async altaVenta(req: Request, res: Response) {

    var pIdVendedor = req.params.IdPersona;

    var pIdCliente = req.body[0];
    var pIdEmpleado = req.body[1];
    var pLineaVenta = req.body[2];  // productos/servicios
    var pMontoTotal = req.body[3];
    var pIdTipoPago = req.body[4];
    var pDescripcion = req.body[6];
    // var pFechaVenta = req.body[4];
    // var pLineaTipoPago = req.body[2];

    if(pDescripcion == null || pDescripcion == 'null' || pDescripcion == '-' || pDescripcion == '' || pDescripcion == 'undefined' || pDescripcion == undefined)
    {
        pDescripcion = '-';
    }

    // ==============================
    try {
        // ====================== Alta Venta ===========================================
        let sql = `call bsp_alta_venta('${pIdTipoPago}','${pIdEmpleado}','${pIdCliente}','${pMontoTotal}','${pDescripcion}')`;
        const [result] = await pool.promise().query(sql)
       
        if(result[0][0].Mensaje != 'Ok')
        {
            logger.error("Error bsp_alta_venta - altaVenta - ventasController");
            res.status(404).json({ "error" : "No se pudo confirmar la operacion"});
            return;
        }       
        // ========================== Lineas de venta =======================================

        pLineaVenta.forEach(async function (value: any) {

            let sql2 = `call bsp_alta_linea_venta('${result[0][0].IdVenta}','${value.IdProductoServicio}','${value.precio_venta}','${value.tipo}','${value.cantidad}')`;
            const [result2] = await pool.promise().query(sql2)

            if(result2[0][0].Mensaje != 'Ok')
            {
                logger.error("Error bsp_alta_linea_venta - ventasController");
                res.status(404).json({ "error" : "No se pudo confirmar la operacion"});
                return;
            }
        });

        res.json({ Mensaje : 'Ok'});

        // ======================= Confirmar transferencia exitosa ==========================================
      
        // return result
      } catch (error) {
        logger.error("Error funcion altaVenta - ventasController");
        res.status(404).json({ "error" : error});
        return;
      }
      
}


// ==================================================
//         
// ==================================================
async alta_egreso(req: Request, res: Response) {

    var pIdVendedor = req.params.IdPersona;
    var pIdVenta;

    var pIdEmpleado = req.body[0];
    var pIdUsuarioActual = req.body[1];
    var pMonto = req.body[2];
    var pIdTipoPago = req.body[3];
    var pMetodoPago = req.body[4];
    var pDescripcion = req.body[5];

    // ==============================
    try {
        // ====================== Alta  ===========================================
        let sql = `call bsp_alta_egreso('${pMonto}','${pIdTipoPago}','${pMetodoPago}','${pIdEmpleado}','${pIdUsuarioActual}','${pDescripcion}')`;
        const [result] = await pool.promise().query(sql)
        

        if(result[0][0].Mensaje != 'Ok')
        {
            logger.error("Error bsp_alta_egreso - altaEgreso - ventasController");

        }

        // return result
      } catch (error) {
        logger.error("Error funcion alta egreso - ventasController");
        res.status(404).json({ "error" : error});
        return;
      }
      res.json({ Mensaje : 'Ok'});
    //   res.json({"mensaje": await confirmarTransaccion(pIdVenta)});
}


// ==================================================
//        Lista 
// ==================================================
listarTiposPago(req: Request, res: Response) {

    pool.query(`call bsp_listar_tipos_pago()`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}


// ==================================================
//        
// ==================================================
listar_transacciones(req: Request, res: Response) {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var FechaInicio = req.params.FechaInicio;
    var FechaFin = req.params.FechaFin;

    pool.query(`call listar_transacciones_fecha('${desde}','${FechaInicio}','${FechaFin}')`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}

// ==================================================
//  
// ==================================================
public async baja_transaccion(req: Request, res: Response): Promise<any> {
    
    // const { IdPersona } = req.params;
    const { id_transaccion } = req.params;

    pool.query(`call bsp_baja_transaccion('${id_transaccion}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

// ==================================================
//        
// ==================================================
dame_transaccion(req: Request, res: Response) {

    var id_transaccion = req.params.id_transaccion;

    pool.query(`call bsp_dame_transaccion('${id_transaccion}')`, function(err: any, result: any){
       if(err){
           return;
       }
       res.json(result);
   })

}

}


const ventasController = new VentasController;
export default ventasController;