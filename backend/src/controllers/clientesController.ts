import { Request, Response, NextFunction, response } from 'express';
import pool from '../database';
const bcrypt = require('bcrypt');

const logger = require("../utils/logger").logger;

class ClientesController {


// ==================================================
//        Obtiene un cliente de la BD
// ==================================================
public async dameDatosCliente(req: Request, res: Response): Promise<any> {
    const { IdPersona } = req.params;

    pool.query(`call bsp_dame_cliente('${IdPersona}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

 // ==================================================
//        Lista 
// ==================================================

public async cargarDatosFormEditarCliente(req: Request, res: Response): Promise<void> {
    var pIdCliente = req.params.pIdCliente;
    var IdPersona = req.params.IdPersona;

    pool.query(`call bsp_dame_datos_cliente('${IdPersona}','${pIdCliente}')`, function(err: any, result: any, fields: any){
       if(err){
           console.log("error", err);
           return;
       }
       res.json(result);
   })
}
// ==================================================
//        Inserta un cliente enviando un correo de confirmacion
// ==================================================
public async altaCliente(req: Request, res: Response) {
    
    const { IdPersona } = req.params;
    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var DNI = req.body[2];
    var Telefono = req.body[3];
    var Email = req.body[4];
    var Direccion = req.body[5];
    var FechaNac = req.body[6];
    var Observaciones = req.body[7];
    var id_sucursal = req.body[8];

    
    pool.query(`call bsp_alta_cliente('${IdPersona}','${Apellidos}','${Nombres}','${DNI}','${Telefono}','${Email}','${Direccion}','${FechaNac}','${Observaciones}','${id_sucursal}')`, function(err: any, result: any, fields: any){

        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(result);
    })

    // enviarMailBienvenida(Email);   

}
// ==================================================
//      
// ==================================================
public async editarCliente(req: Request, res: Response) {

    const { IdPersona } = req.params;

    var Apellidos = req.body[0];
    var Nombres = req.body[1];
    var Telefono = req.body[2];
    var DNI = req.body[3];
    var Email = req.body[4];
    var direccion = req.body[5];

    var Observaciones = req.body[6];

    var pIdCliente = req.body[7];

    pool.query(`call bsp_editar_cliente('${pIdCliente}','${Apellidos}','${Nombres}','${Telefono}','${DNI}','${Email}','${direccion}','${Observaciones}')`,function(err: any, result: any, fields: any){
        
                if(err){
                    res.status(404).json(err);
                    return;
                }
                
                if(result[0][0].Mensaje !== 'Ok'){
                    return res.json( result );
                }

                return res.json({ Mensaje: 'Ok' });
            })          
    
}

// ==================================================
//   Activa un cliente (caso de ya existencia en la BD)
// ==================================================
public async activarCliente(req: Request, res: Response) {

    var IdPersona = req.params.IdPersona;

    const result: any = await pool.query('CALL bsp_activar_cliente(?)',IdPersona);

    if(result[0][0].Mensaje !== 'Ok'){
        return res.json({
            ok: false,
            mensaje: result[0][0].Mensaje
        });
    }

    return res.json({ Mensaje: 'Ok' });

}


// ==================================================
//        Lista Clientes desde cierto valor
// ==================================================
public async buscarClientesPaginado(req: Request, res: Response): Promise<void> {
   
    var desde = req.params.desde || 0;
    desde  = Number(desde);

    var pIdPersona = req.params.IdPersona;
    var clienteBuscado: any = req.params.clienteBuscado;
    var pIdSucursal: any = req.params.pIdSucursal;
    
    if(clienteBuscado == '0' || clienteBuscado == 0)
    {
        clienteBuscado = "todosClientes";
    }

    pool.query(`call bsp_buscar_clientes_paginado('${clienteBuscado}','${desde}','${pIdSucursal}')`, function(err: any, result: any, fields: any){
        if(err){
           res.status(404).json(result);
           return;
       }
       res.status(200).json(result);
    })

 }

// ==================================================
//        Obtiene un cliente de la BD
// ==================================================
public async bajaCliente(req: Request, res: Response): Promise<any> {
    const { IdPersona } = req.params;
    const { IdCliente } = req.params;

    pool.query(`call bsp_baja_cliente('${IdPersona}','${IdCliente}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json(err);
            return;
        }
        
        res.status(200).json(result[0]);
    })

}

// ==================================================
//        Edita un cliente
// ==================================================


public async actualizaCliente(req: Request, res: Response) {

    var IdPersona = req.body.IdPersona;
    var IdTipoDocumento = req.body.IdTipoDocumento;
    var Apellidos = req.body.Apellidos;
    var Nombres = req.body.Nombres;
    var Documento = req.body.Documento;
    var Password = req.body.Password;
    var Telefono = req.body.Telefono;
    var Sexo = req.body.Sexo;
    var Observaciones = req.body.Observaciones;
    var FechaNac = req.body.FechaNac;
    var Correo = req.body.Correo;
    var Usuario = req.body.Usuario;
    var Calle = req.body.Calle;
    var Piso = req.body.Piso;
    var Departamento = req.body.Departamento;
    var Ciudad = req.body.Ciudad;
    var Pais = req.body.Pais;
    var Numero = req.body.Numero;    // 20
    var Objetivo = req.body.Objetivo;
    var Ocupacion = req.body.Ocupacion;
    var Horario = req.body.Horario;

    pool.query(`call bsp_editar_cliente('${IdPersona}','${IdTipoDocumento}','${Apellidos}','${Nombres}',
    '${Documento}','${Password}','${Telefono}','${Sexo}','${Observaciones}','${FechaNac}',
    '${Correo}','${Usuario}','${Calle}',${Piso},'${Departamento}','${Ciudad}','${Pais}',${Numero},
    '${Objetivo}','${Ocupacion}','${Horario}')`, function(err: any, result: any, fields: any){
        if(err){
            console.log("error : ", err);
            res.status(404).json({ text: "Ocurrio un problema" });
            return;
        }
    
        if(result[0][0].Mensaje !== 'Ok'){
            return res.json({
                ok: false,
                Mensaje: result[0][0].Mensaje
            });
        }

        return res.json({ Mensaje: 'Ok' });
    })

}

// ==================================================
//        Autocomplete
// ==================================================
public async buscarCliente(req: Request, res: Response): Promise<any> {
    var clienteBuscado = req.params.clienteBuscado;
    var pIdSucursal = req.params.pIdSucursal;

    pool.query(`call bsp_buscar_cliente('${clienteBuscado}','${pIdSucursal}')`, function(err: any, result: any, fields: any){
        if(err){
            res.status(404).json({ text: "La personas no existe" });
            return;
        }
        
        res.status(200).json(result[0]);
    })

}
}


const clientesController = new ClientesController;
export default clientesController;