import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require("dotenv").config();

var SEED = process.env.JWT_KEY;

import pool from '../database';
const logger = require("../utils/logger").logger;

class LoginController {

// ========================================================
// Login
// ========================================================

public async login(req: Request, res: Response){

const usuario = req.body[0];
const pass = req.body[1];

//
pool.query(`call bsp_chequear_activacion()`, function(err: any, result: any, fields: any){
    if(err){
        res.status(404).json(err);
        return;
    }
    
    if(result[0][0].Mensaje != 'Ok')
    {
        res.status(200).json({
            ok: true,
            mensaje : 'no_activado'
        });
        return;
    }else{
        //
        pool.query(`call bsp_login('${usuario}')`, function(err: any, resultLogin: string | any[]){
            var menu: any = [];

            if(err){
                pool.query(`call bsp_alta_log('0','0','LoginController','0','loginUsuario','Error de login en panel + ${usuario}')`, function(err: any, result: any, fields: any){
                    if(err){
                        logger.error("Error en bsp_alta_log - loginUsuario - loginController " + usuario);
                        return;
                    }
                })

                res.status(401).json({
                    ok: true,
                    mensaje : 'Error de credenciales'
                });
                return;
            }
            // Chequeo la contraseña
            
            bcrypt.compare(pass, resultLogin[0][0].lPassword, function(err: any, result: any) {
                
                if(result != true || err){
                    logger.error("Error en bcrypt.compare - loginUsuario - loginController ");

                    res.status(500).json({
                        ok: true,
                        mensaje : 'Ocurrio un problema, contactese con el administrador'
                    });
                    
                    return;
                }
                else{ 
                    // Creo el token
                    var token = jwt.sign({ IdPersona: resultLogin[0][0].lIdPersona }, SEED, { expiresIn: 14400});
                    
                    menu = resultLogin[1];
                    
                    // Respuesta
                    res.status(200).json({
                        ok: true,
                        IdPersona: resultLogin[0][0].lIdPersona,
                        token: token,
                        sucursal: resultLogin[0][0].lSucursal,
                        id_sucursal: resultLogin[0][0].lIdSucursal

                    });
                }
            });
        
            
        })
        //
    }

})


}


// ==========================================
//  Renueva TOKEN
// ==========================================
public async renuevatoken(req: Request, res: Response): Promise<void> {
    
    var body = req.body;    // Usuario y contraseña

    var token = jwt.sign({ usuario: body.correo }, SEED, { expiresIn: 14400});// 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });

}

}

const loginController = new LoginController;
export default loginController;
