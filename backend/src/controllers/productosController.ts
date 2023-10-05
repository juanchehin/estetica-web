import { Request, Response } from 'express';
import pool from '../database';
const logger = require("../utils/logger").logger;

class ProductosController {   

// ==================================================
//        Inserta un cliente enviando un correo de confirmacion
// ==================================================
public async altaProducto(req: Request, res: Response) {
    
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
//        Lista productos
// ==================================================
public async listarProductosPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);

    pool.query(`call bsp_listar_productos_paginado('${desde}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//        Lista productos
// ==================================================
public async bajaProducto(req: Request, res: Response): Promise<void> {

    var IdPersona = req.params.IdPersona;
    var IdProducto = req.params.pIdProducto;

    pool.query(`call bsp_baja_producto('${IdPersona}','${IdProducto}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })
}

// ==================================================
//   Listado de productos en panel
// ==================================================
public async buscarProductoPaginado(req: Request, res: Response): Promise<void> {

    var desde = req.params.desde || 0;
    desde  = Number(desde);
    var pParametroBusqueda = req.params.pParametroBusqueda || '';
    const IdSucursal = req.params.IdSucursal;

    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == '-' || pParametroBusqueda == '')
    {
        pParametroBusqueda = '-';
    }

    pool.query(`call bsp_buscar_producto_paginado('${req.params.IdPersona}','${pParametroBusqueda}','${desde}','${IdSucursal}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en bsp_buscar_producto_paginado - productosController");

            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}


// ==================================================
//        Autocomplete productos
// ==================================================
public async buscarProductoAutoComplete(req: Request, res: Response): Promise<void> {

    var pParametroBusqueda = req.params.pProductoBuscado || '';
    var pIdSucursal = req.params.IdSucursal;
    var pIdUsuario = req.params.IdPersona;
    
    if(pParametroBusqueda == null || pParametroBusqueda == 'null' || pParametroBusqueda == 'undefined' || pParametroBusqueda == undefined)
    {
        pParametroBusqueda = '';
    }
    
    pool.query(`call bsp_buscar_producto_autocomplete('${pParametroBusqueda}','${pIdSucursal}','${pIdUsuario}')`, function(err: any, result: any){
        
        if(err){
            logger.error("Error en bsp_buscar_producto_autocomplete - productosController");
            res.status(400).json(err);
            return;
        }

        res.status(200).json(result);
    })
}
}


const productosController = new ProductosController;
export default productosController;