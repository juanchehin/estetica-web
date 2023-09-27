import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  persona!: any;
  personaValor!: any;
  IdPersona!: any;
  IdRol: any;
  token!: any;
  sucursal: any;
  id_sucursal: any;
  menuBack: any[] = Array();

  private IdPersonaSource = new BehaviorSubject<string>('');
  public  quoteIdPersona = this.IdPersonaSource.asObservable();  // 


  constructor(
    public http: HttpClient,
    public router: Router ) {
    this.cargarStorage();
  }

// ====================================================================================================================
// =========================================== LOGUEO =================================================================
// ====================================================================================================================
setIdPersona(IdPersona: any) {
  this.IdPersonaSource.next(IdPersona);
}

// ==================================================
//        Logueo de la persona
// ==================================================
login( persona: any ): any {

  const url = URL_SERVICIOS + '/login/acceso';

  return this.http.post(url, persona)
    .pipe(
          map(
            ( resp: any ) => {
              
                if (resp.mensaje === 'Error de credenciales') {
                  return false;
                }

      this.setIdPersona(resp.IdPersona);  //

      this.guardarStorage( resp.IdPersona, resp.token, resp.sucursal, resp.id_sucursal);

      this.cargarStorage();

      return true;
    }));


}

// ==================================================
//        Guarda la info en el localstorage
//  Guarda en las variables del servicio
// ==================================================
guardarStorage( id: string, token: string, sucursal: any, id_sucursal: any ) {

  localStorage.setItem('id', id );
  localStorage.setItem('token', token );
  localStorage.setItem('sucursal', sucursal );
  localStorage.setItem('id_sucursal', id_sucursal );

  this.token = token;
  this.IdPersona = id;
  this.sucursal = sucursal;
  this.id_sucursal = id_sucursal;

}

// ==================================================
// Carga la informacion almacenada en el localstorage a la informacion actual para que
// pueda ser accesada desde este servicio
// ==================================================
  cargarStorage() {

    if ((localStorage.getItem('token') === 'undefined') || (localStorage.getItem('token') === null)) {
      this.token = '';
      this.persona = null;
      this.IdPersona = null;
      
    } else {
      const var1 = localStorage.getItem('token');
      this.token = var1;

      this.sucursal = localStorage.getItem('sucursal');

      const var3 = localStorage.getItem('id');
      this.IdPersona = var3;
    }

  }

// ==================================================
//        Permite saber si un usuario esta logueado
// ==================================================
estaLogueado() {

  this.token = localStorage.getItem('token');
  if ((this.token === 'undefined') || (this.token === null)) {
    return false;
  } else {
    return( this.token.length > 5) ? true : false;

  }
}


// ==================================================
//   Actualiza los datos del usuario (Estado,Clases disponibles,mesesCredito,etc)
// ==================================================
actualizaEstadoCliente( IdPersona: string ) {
  const url = URL_SERVICIOS + '/login/control/estado/' + IdPersona;
  return this.http.get(url);
}
// ==================================================
//        Hace el logout del usuario
// ==================================================

logout() {
  
  this.token = '';
  this.IdPersona = null;

  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('sucursal');
  localStorage.removeItem('id_sucursal');


  this.router.navigate(['/login']);
}

}
