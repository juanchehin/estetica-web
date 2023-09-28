import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

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
  listarServiciosPaginado(desde: any,IdSucursal: any,pParametroBusqueda: any){

    let url = URL_SERVICIOS + '/servicios/buscar/' + desde + '/' + pParametroBusqueda + '/' + IdSucursal + '/' + this.IdPersona;

    return this.http.get( url, this.headers );
  }  

  // ==================================================
//        
// ==================================================
altaServicio( servicio: any ) {

  const IdSucursal = localStorage.getItem('id_sucursal')

  let url = URL_SERVICIOS + '/servicios/alta/' + this.IdPersona + '/' + IdSucursal;

  return this.http.post( url, servicio, this.headers);
}
  // ==================================================
//        
// ==================================================
destacarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/servicios/destacar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
ofertarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/servicios/ofertar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
publicarProducto( IdProducto: any ) {

  let url = URL_SERVICIOS + '/servicios/publicar/' + IdProducto + '/' + this.IdPersona;

  return this.http.get(url,this.headers);
}
  // ==================================================
//        
// ==================================================
editarServicio( servicioEditado: any ) {

  let url = URL_SERVICIOS + '/servicios/editar/' + this.IdPersona;

  return this.http.post( url, servicioEditado, this.headers);

}
  // ==================================================
//        
// ==================================================
baja_servicio( id_servicio: any ) {

  let url = URL_SERVICIOS + '/servicios/baja/' + id_servicio + '/' + this.IdPersona;

  return this.http.get(url, this.headers);
}
// ==================================================
//  Carga los servicios en el autocomplete, que coincidan con el parametroBusqueda
// ==================================================
cargarServicios( parametroBusqueda: string, IdSucursal: any){

    let url = URL_SERVICIOS + '/servicios/listar/busqueda/autocomplete/' + parametroBusqueda + '/' + IdSucursal + '/' + this.IdPersona;
    return this.http.get( url, this.headers ); 
    
}

// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal
// ==================================================
cargarDatosFormNuevoProducto( ){
  
    let url = URL_SERVICIOS + '/servicios/nuevo/datos-formulario';
    return this.http.get( url , this.headers);
  
}
// ==================================================
// Cargo las marcas,categorias,unidades,sucursal principal y el servicio
// ==================================================
cargarDatosFormEditarServicio(id_servicio: any ){
  
  let url = URL_SERVICIOS + '/servicios/editar/datos-formulario/' + id_servicio + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
// ==================================================
// Busca 
// ==================================================

buscarServicios( servicio: string , pDesde: any ): any {

  if(servicio == '' || servicio == null){
    let url = URL_SERVICIOS + '/servicios/listar/' + 0;
    return this.http.get(url, this.headers);
  }
  else
  { 
    const url = URL_SERVICIOS + '/servicios/buscar/' + servicio + '/' + pDesde;
    return this.http.get(url, this.headers);
  } 

}

}
