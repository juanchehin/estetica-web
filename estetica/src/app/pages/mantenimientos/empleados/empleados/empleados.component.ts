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

  @ViewChild('inputEmpleadoBuscado') inputEmpleadoBuscado!: ElementRef;

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

    const inputElement: HTMLInputElement = document.getElementById('empleadoBuscado') as HTMLInputElement;
    const empleadoBuscado: any = inputElement.value || null;

    this.empleadosService.buscarEmpleadosPaginado( this.desde,empleadoBuscado  )
               .subscribe( {
                next: (resp: any) => { 
                  console.log('resp::: ', resp);

                  if(resp[0][0] != undefined && resp[2] && resp[2][0].mensaje == 'Ok')
                  { 
                    this.totalEmpleados = resp[1][0].cantEmpleados;
    
                    this.empleados = resp[0];
                    return;
                  } else {
                    this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);
                  }
                  return;
                 },
                error: () => { 
                  this.alertService.alertFailWithText('Ocurrio un error','Contactese con el administrador',2000);
                }
              });

  }



// ==================================================
// 
// ==================================================

bajaEmpleado(IdPersona: string) {

  // Swal.fire({
  //   title: '¿Desea eliminar el empleado?',
  //   text: "Eliminacion de empleado",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Si'
  // }).then((result: any) => {
  //   if (result.isConfirmed) {
  //     this.empleadosService.bajaEmpleado( IdPersona )
  //     .subscribe({
  //       next: (resp: any) => {
  
  //         if(resp[0][0] != undefined && resp[0].mensaje == 'Ok') {
  //           this.alertService.alertSuccess('top-end','Empleado dado de baja',false,900);
  //           this.buscarEmpleados();
            
  //         } else {
  //           this.alertService.alertFail('Ocurrio un error al procesar el pedido',false,1200);
            
  //         }
  //        },
  //       error: (resp: any) => {  this.alertService.alertFail(resp[0][0].mensaje,false,1200); }
  //     });
  //   }
  // })

  
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

}
