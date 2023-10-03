import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-historico-empleado',
  templateUrl: './historico-empleado.component.html',
  styles: []
})
export class HistoricoEmpleadoComponent implements OnInit {

  desde = 0;
  transacciones!: any;
  total_transacciones = 0;
  cargando = true;
  id_empleado_seleccionado: any;
  empleado: any;

  fecha_inicio = this.utilService.formatDateNow(new Date(Date.now()));
  fecha_fin = this.utilService.formatDateNow(new Date(Date.now()));


  constructor(
    public empleadosService: EmpleadosService,
    public activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private utilService: UtilService
  ) {
   }

  ngOnInit() {
    this.id_empleado_seleccionado = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.listar_historico_empleado();
  }

// ==================================================
// Carga
// ==================================================

listar_historico_empleado() {

    this.empleadosService.listar_historico_empleado( this.desde,this.id_empleado_seleccionado,this.fecha_inicio,this.fecha_fin  )
               .subscribe( {
                next: (resp: any) => {

                  if(resp[3][0].mensaje == 'Ok')
                  { 
                    this.total_transacciones = resp[2][0].total_transacciones;
    
                    this.transacciones = resp[0];
                    this.empleado = resp[1][0].empleado;

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
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.total_transacciones ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.listar_historico_empleado();

}

// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
    
  this.desde = 0;
  this.listar_historico_empleado();

}


}
