import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { UtilService } from 'src/app/services/util.service';
import { AlertService } from 'src/app/services/alert.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  nombreEmpresa: any;
  desde = 0;
  transacciones: any;
  id_transaccion_seleccionado: any;

  fechaInicio = this.utilService.formatDateNow(new Date(Date.now()));
  fechaFin = this.utilService.formatDateNow(new Date(Date.now()));

  ventas_total = 0;
  efectivo = 0;
  credito = 0;
  debito = 0;
  transferencia = 0;
  egresos = 0;
  cta_cte = 0;
  voucher = 0;
  monto_egreso = 0;
  tiposPago: any;
  IdTipoPagoSelect: any;
  tipo_egreso: any;
  array_egreso: any = [];
  IdEmpleado = 0;
  id_usuario_actual: any;
  empleados: any;
  IdTipoPago: any;
  descripcion: any;
  habilitar_empleados = false;
  estado_caja = 'C';

  // detalles transaccion
  detalle_id_transaccion: any;
  detalle_cliente: any;
  detalle_empleado: any;
  detalle_monto_total: any;
  detalle_lineas_venta: any;
  detalle_fecha: any;
  detalle_tipo_pago: any;

  @ViewChild('divCerrarModalBajaTransaccion') divCerrarModalBajaTransaccion!: ElementRef<HTMLElement>;
  @ViewChild('cerrarModalNuevaTransaccionMenu') divCerrarModalNuevoTransaccionMenu!: ElementRef<HTMLElement>;
  @ViewChild('cerrarModalEgreso') cerrarModalEgreso!: ElementRef<HTMLElement>;

  constructor(
    private ventasService: VentasService,
    private utilService: UtilService,
    private alertService: AlertService,
    private empleadosService: EmpleadosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarDatosDashboard();
    this.cargarTiposPago();
    this.cargar_datos_empleados();
    this.id_usuario_actual = localStorage.getItem('id');
  }


// ====================
// 
// =================
cargarDatosDashboard(){

  this.alertService.cargando = true;

  this.ventasService.listar_transacciones(this.desde,this.fechaInicio,this.fechaFin  )
              .subscribe( (resp: any) => {

              this.transacciones = resp[0];

              this.ventas_total = resp[2][0].p_suma_ventas || 0;
              this.efectivo = resp[2][0].p_suma_efectivo || 0;
              this.credito = resp[2][0].p_suma_deposito || 0;
              this.debito = resp[2][0].p_suma_retiro || 0;
              this.transferencia = resp[2][0].p_suma_transferencia || 0;
              this.egresos = resp[2][0].p_suma_gastos || 0;
              this.voucher = resp[2][0].p_suma_voucher || 0;
              this.estado_caja = resp[2][0].estado_caja || 'C';

              this.alertService.cargando = false;

            });

}

// ==================================================
// 
// ==================================================

modal_baja_transaccion(id_transaccion: string) {

  this.id_transaccion_seleccionado = id_transaccion;

}

// ==================================================
// 
// ==================================================

baja_transaccion() {

      this.ventasService.baja_transaccion( this.id_transaccion_seleccionado )
      .subscribe({
        next: (resp: any) => {
  
          if((resp[0].Mensaje == 'Ok')) {

            // this.alertService.alertSuccess('Eliminacion','Transaccion dada de baja',3000);
            
            // let el: HTMLElement = this.divCerrarModalBajaTransaccion.nativeElement;
            // el.click();

            this.cargarDatosDashboard();
            
          } else {
            
            this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
            
          }
         },
        error: (resp: any) => {  

          this.alertService.alertFail(resp[0][0].mensaje,false,1200);
        
        }
      });
  
  }

// ==================================================
// Carga
// ==================================================
cargar_datos_empleados() {

  this.empleadosService.buscarEmpleadosPaginado(0, '' )
             .subscribe( {
              next: (resp: any) => { 
              
              this.empleados = resp[0];

            },
            error: (err: any) => {
              this.alertService.alertFail('Ocurrio un error al cargar los tipos de pago ' + err,false,400); }
          });

}
// ==================================================
// Carga
// ==================================================
cargarTiposPago() {

  this.ventasService.cargarTiposPago( )
             .subscribe( {
              next: (resp: any) => { 
              
              this.tiposPago = resp[0];

            },
            error: (err: any) => {
              this.alertService.alertFail('Ocurrio un error al cargar los tipos de pago ' + err,false,400); }
          });

}

// 
onChangeTipoPago(val: any){
  this.IdTipoPagoSelect = val;
}

// 
onChangeMetodoPago(val: any){
  
  if(val == 'A')
  {
    this.habilitar_empleados = true;
  }
  else{
    this.habilitar_empleados = false;
  }
}

// 
onChangeEmpleado(val: any){

  this.IdEmpleado = val;
}
// ==================================================
//        Crear 
// ==================================================

alta_egreso() {

  if(this.estado_caja != 'A')
  {
    this.alertService.alertFail('Mensaje','Debe abrir caja',2000);
    return;
  }

  if(this.monto_egreso <= 0)
  {
    this.alertService.alertFail('Mensaje','Monto invalido',2000);
    return;
  }

  if(this.IdTipoPagoSelect == undefined)
  {
    this.alertService.alertFail('Mensaje','Tipo pago invalido',2000);
    return;
  }
  
  if(this.tipo_egreso == undefined)
  {
    this.alertService.alertFail('Mensaje','Metodo pago invalido',2000);
    return;
  }

  this.alertService.cargando = true;
  
      this.array_egreso.push(        
        this.IdEmpleado,
        this.id_usuario_actual,
        this.monto_egreso,
        this.IdTipoPagoSelect,
        this.tipo_egreso,
        this.descripcion
        );

      this.ventasService.alta_egreso(  this.array_egreso )
      .subscribe({
        next: (resp: any) => {
          
          if ( resp.Mensaje == 'Ok') {
            this.alertService.alertSuccess('Mensaje','Egreso cargada',2000);

            this.monto_egreso = 0;
            this.IdTipoPagoSelect = 1;
            this.tipo_egreso = 'E';
            this.descripcion = '';

            let el: HTMLElement = this.cerrarModalEgreso.nativeElement;
            el.click();

            this.cargarDatosDashboard();
            // this.resetearVariables();
            this.alertService.cargando = false;
            
          } else {
            this.alertService.alertFail('Ocurrio un error',false,2000);
            this.alertService.cargando = false;

          }
          return;
         },
        error: () => { 
          this.alertService.alertFail('Ocurrio un error',false,2000);
          this.alertService.cargando = false;
        }
      });
      this.array_egreso = [];


}

//
rutear_nueva_venta(){

  if(this.estado_caja != 'A')
  {
    this.alertService.alertFail('Mensaje','Debe abrir caja',2000);
    return;
  }

  this.router.navigate(['/dashboard/ventas/nueva']);

}

// ====================
// 
// =================
ver_transaccion(transaccion: any){

  this.alertService.cargando = true;

  this.ventasService.dame_transaccion( transaccion.id_transaccion )
               .subscribe( {
                next: (resp: any) => {
                  
                  if((resp[2][0].mensaje == 'Ok')) {
            
                    this.detalle_id_transaccion = transaccion.id_transaccion;
                    this.detalle_cliente = transaccion.Cliente;
                    this.detalle_empleado = transaccion.Empleado;
                    this.detalle_fecha = transaccion.Fecha;
                    this.detalle_lineas_venta = resp[0];
                    this.detalle_monto_total = transaccion.Monto;
                    this.detalle_tipo_pago = resp[1][0].tipo_pago;  
                    
                    this.alertService.cargando = false;
                    
                  } else {
                    
                    this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                    this.alertService.cargando = false;
                    
                  }
                 },
                error: (resp: any) => {            
                  this.alertService.alertFailWithText('Ocurrio un error al procesar el pedido','Error',1200);
                  this.alertService.cargando = false;

                }
              });
  }
}
