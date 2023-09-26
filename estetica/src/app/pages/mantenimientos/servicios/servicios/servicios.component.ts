import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { SucursalesService } from 'src/app/services/sucursal.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styles: []
})
export class ServiciosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  IdSucursal = 1;
  servicios!: any;
  sucursales: any;
  totalServicios = 0;
  id_servicio_seleccionado: any;

  @ViewChild('inputServicioBuscado') inputServicioBuscado!: ElementRef;
  @ViewChild('divCerrarModalBajaServicio') divCerrarModalBajaServicio!: ElementRef;


  constructor(
    public serviciosService: ServiciosService,
    private sucursalesService: SucursalesService,
    public alertaService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarServicio();
    this.cargarSucursales();
  }

// ==================================================
// Carga
// ==================================================

buscarServicio() {

    const inputElement: HTMLInputElement = document.getElementById('buscarServicio') as HTMLInputElement;
    const servicioBuscado: any = inputElement.value || '-';

    this.serviciosService.listarServiciosPaginado( this.desde , this.IdSucursal, servicioBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.servicios = [];
                    this.totalServicios = 0;
                    
                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    this.totalServicios = resp[1][0].cantServiciosBuscados;
                    this.servicios = resp[0];
                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000)
                }
              });

  }

// ==================================================
// Carga
// ==================================================

cargarSucursales() {


  this.sucursalesService.listarTodasSucursales(   )
             .subscribe( (resp: any) => {

              this.sucursales  = resp[0];

            });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalServicios ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarServicio();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputServicioBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.IdSucursal = 1;
  this.buscarServicio();

}


// ==================================================
// 
// ==================================================

baja_servicio() {

  this.serviciosService.baja_servicio( this.id_servicio_seleccionado )
  .subscribe({
    next: (resp: any) => {

      if((resp[0][0].Mensaje == 'Ok')) {

        this.alertaService.alertSuccess('Eliminacion','Servicio dada de baja',3000);
        
        let el: HTMLElement = this.divCerrarModalBajaServicio.nativeElement;
        el.click();

        this.refrescar();
        
      } else {
        
        this.alertaService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
        
      }
     },
    error: (resp: any) => {  

      this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
    
    }
  });

}

// ==================================================
// 
// ==================================================

modal_baja_servicio(id_servicio: string) {

  this.id_servicio_seleccionado = id_servicio;

}


}
