import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

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
altaEmpleado( empleado: any ) {

  let url = URL_SERVICIOS + '/empleados/alta/' + this.IdPersona;

  return this.http.post(url,empleado, this.headers );
}
// ==================================================
//
// ==================================================
cargarEmpleados( parametroBusqueda: string){

    const id_sucursal = localStorage.getItem('id_sucursal');

    if(parametroBusqueda == '' || parametroBusqueda == null){
      let url = URL_SERVICIOS + '/empleados/listar/paginado/' + 0 + '/' + id_sucursal;
      return this.http.get( url );
    }
    else
    { 
      let url = URL_SERVICIOS + '/empleados/listar/busqueda/' + parametroBusqueda + '/' + id_sucursal;
      return this.http.get( url );
    }
    
  }

// ==================================================
//
// ==================================================
buscarEmpleadosPaginado(desde: any,pEmpleadoBuscado: any){

  if(pEmpleadoBuscado == '' || pEmpleadoBuscado == null || pEmpleadoBuscado == 'null' || !pEmpleadoBuscado || pEmpleadoBuscado.length == 0)
  {
    pEmpleadoBuscado = 'todosEmpleados';
  }

  let url = URL_SERVICIOS + '/empleados/listar/paginado/' + this.IdPersona + '/' + desde + '/' + pEmpleadoBuscado;

  return this.http.get( url, this.headers );
}

// ==================================================
//        
// ==================================================
bajaEmpleado(IdEmpleado: any ) {

  let url = URL_SERVICIOS + '/empleados/baja/' + IdEmpleado + '/' + this.IdPersona;

  return this.http.get( url, this.headers);
}
  // ==================================================
//        
// ==================================================
editarEmpleado( empleadoEditado: any ) {

  let url = URL_SERVICIOS + '/empleados/editar/' + this.IdPersona;

  return this.http.post( url, empleadoEditado,this.headers);
}


// ==================================================
//        
// ==================================================
cargarDatosFormEditarEmpleado( IdEmpleado: any ) {

  let url = URL_SERVICIOS + '/empleados/editar/datos-formulario/' + IdEmpleado + '/' + this.IdPersona;
  return this.http.get( url , this.headers );

}
}
