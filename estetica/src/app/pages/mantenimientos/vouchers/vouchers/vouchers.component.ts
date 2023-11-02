import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { VentasService } from 'src/app/services/ventas.service';
import { VouchersService } from 'src/app/services/vouchers.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styles: []
})
export class VouchersComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  estado_voucher = 'T';
  vouchers!: any;
  sucursales: any;
  cantidad_vouchers = 0;
  id_voucher_seleccionado: any;
  habilitar_boton_confirmar_voucher = true;

  // Empleados
  empleados: any;
  keywordEmpleado = 'empleado';
  empleadoBuscado = '';
  id_empleado_seleccionado = 0;

  @ViewChild('inputVoucherBuscado') inputVoucherBuscado!: ElementRef;
  @ViewChild('divCerrarModalBajaVoucher') divCerrarModalBajaVoucher!: ElementRef;


  constructor(
    private ventasService: VentasService,
    public vouchersService: VouchersService,
    public alertaService: AlertService,
    public empleadosService: EmpleadosService
  ) {
   }

  ngOnInit() {
    this.listar_vouchers();
  }

// ==================================================
// Carga
// ==================================================

listar_vouchers() {

  this.alertaService.cargando = true;

    this.vouchersService.listar_vouchers_paginado( this.desde , this.estado_voucher  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.vouchers = [];
                    this.cantidad_vouchers = 0;
                    this.alertaService.cargando = false;
                    
                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    this.cantidad_vouchers = resp[1][0].cantidad_transacciones;
                    this.vouchers = resp[0];
                    this.alertaService.cargando = false;

                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                  }
                  this.alertaService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000)
                }
              })
              this.alertaService.cargando = false;
              ;

  }

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.cantidad_vouchers ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_vouchers();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  
  this.desde = 0;
  
  this.listar_vouchers();

}


// ==================================================
// 
// ==================================================

baja_voucher() {


  this.ventasService.baja_transaccion( this.id_voucher_seleccionado )
  .subscribe({
    next: (resp: any) => {

      if((resp[0].Mensaje == 'Ok')) {

        this.alertaService.alertSuccess('Mensaje','Operacion exitosa',3000);
        
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

modal_baja_voucher(id_voucher: string) {

  this.id_voucher_seleccionado = id_voucher;

}
// ==================================================
// 
// ==================================================

confirmar_voucher() {

  if((this.id_empleado_seleccionado == undefined) ||(this.id_empleado_seleccionado <= 0))
  { 
    this.alertaService.alertFail('Mensaje','Debe seleccionar un empleado',2000);
    return;
  }

  this.vouchersService.confirmar_voucher( this.id_voucher_seleccionado, this.id_empleado_seleccionado )
  .subscribe({
    next: (resp: any) => {

      if((resp[0][0].Mensaje == 'Ok')) {

        this.alertaService.alertSuccess('Mensaje','Operacion exitosa',3000);
        
        this.refrescar();
        
      } else {
        
        this.alertaService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
        
      }
     },
    error: (resp: any) => {  
      this.alertaService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
    }
  });


}

// ==================================================
// 
// ==================================================

modal_confirmar_voucher(id_voucher: string) {

  this.id_voucher_seleccionado = id_voucher;

}

  // ==================================================
// Carga
// ==================================================

cargarEmpleados() {

  this.empleadosService.cargarEmpleados( this.empleadoBuscado )
             .subscribe( (resp: any) => {

              this.empleados = resp;

            });

}

// ==============================
  // Para empleados
  // ================================
  selectEventEmpleado(item: any) {
    this.id_empleado_seleccionado = item.id_persona;

    this.habilitar_boton_confirmar_voucher = false;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearchEmpleado(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.empleadoBuscado = val;
    this.cargarEmpleados();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }


}
