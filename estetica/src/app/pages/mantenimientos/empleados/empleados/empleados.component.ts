import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: []
})
export class EmpleadosComponent implements OnInit {

  desde = 0;

  empleados!: any;

  totalEmpleados = 0;
  cargando = true;
  id_empleado_seleccionado: any;

  @ViewChild('inputEmpleadoBuscado') inputEmpleadoBuscado!: ElementRef;
  @ViewChild('divCerrarModalBajaEmpleado') divCerrarModalBajaEmpleado!: ElementRef;

  constructor(
    public empleadosService: EmpleadosService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarEmpleados();
  }

// ==================================================
// Carga
// ==================================================

buscarEmpleados() {

  this.alertService.cargando = true;

    const inputElement: HTMLInputElement = document.getElementById('empleadoBuscado') as HTMLInputElement;
    const empleadoBuscado: any = inputElement.value || null;

    this.empleadosService.buscarEmpleadosPaginado( this.desde,empleadoBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[2][0].mensaje == 'Ok')
                  { 
                    this.totalEmpleados = resp[1][0].cantEmpleados;
    
                    this.empleados = resp[0];
                    this.alertService.cargando = false;

                    return;
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);

                  }
                  this.alertService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);
                  this.alertService.cargando = false;

                }
              });

  }

// ==================================================
// 
// ==================================================

baja_empleado() {

  this.empleadosService.bajaEmpleado( this.id_empleado_seleccionado )
  .subscribe({
    next: (resp: any) => {
      if((resp[0].Mensaje == 'Ok')) {

        this.alertService.alertSuccess('Eliminacion','Empleado dado de baja',3000);
        
        let el: HTMLElement = this.divCerrarModalBajaEmpleado.nativeElement;
        el.click();

        this.refrescar();
        
      } else {
        
        this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
        
      }
     },
    error: (resp: any) => {

      this.alertService.alertFailWithText('Ocurrio un error al procesar el pedido','Error',1200);
    
    }
  });

}
// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalEmpleados ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarEmpleados();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputEmpleadoBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.buscarEmpleados();

}

// ==================================================
// 
// ==================================================

modal_baja_empleado(id_empleado: string) {

  this.id_empleado_seleccionado = id_empleado;

}

}
