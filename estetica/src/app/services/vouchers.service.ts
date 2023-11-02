import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'token': this.token
      }
    }
  }
  // ==============================
  get IdPersona(): any {
    if(this.authService.IdPersona)
    {
      return this.authService.IdPersona;
    }
    else
    {
      return localStorage.getItem('id') || '';
    }
  }


  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

// ==================================================
//
// ==================================================
listar_vouchers_paginado(desde: any,estado_voucher: any){

  const id_sucursal = localStorage.getItem('id_sucursal');

  let url = URL_SERVICIOS + '/vouchers/listar/' + desde + '/' + estado_voucher + '/' + this.IdPersona + '/' + id_sucursal;

    return this.http.get( url, this.headers );
  }  


// ==================================================
//        
// ==================================================
baja_voucher( id_transaccion: any ) {

  let url = URL_SERVICIOS + '/vouchers/baja/' + id_transaccion + '/' + this.IdPersona;

  return this.http.get( url, this.headers ); 

}

// ==================================================
//        
// ==================================================
confirmar_voucher( id_transaccion: any , id_empleado_seleccionado: any) {

  let url = URL_SERVICIOS + '/vouchers/confirmar/' + id_transaccion + '/' + id_empleado_seleccionado + '/' + this.IdPersona;

  return this.http.get( url, this.headers ); 

}
}
