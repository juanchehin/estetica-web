import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-historico-cliente',
  templateUrl: './historico-cliente.component.html'
})
export class HistoricoClienteComponent implements OnInit {

  desde = 0;
  filtroCliente = 4;  // Indica si es un cliente web o un cliente registrado desde el panel
  activarModal = false;
  movimientos!: any;
  IdPersona: any;
  saldo = 0;
  totalMovimientos = 0;
  cargando = true;
  monto = 0;
  descripcion: any;
  apellidos: any;
  tiposPago: any;
  IdTipoPagoSelect = 0;
  nombres: any;
  @ViewChild('divCerrarModal') divCerrarModal!: ElementRef<HTMLElement>;

  constructor(
    public clientesService: ClientesService,
    private alertService: AlertService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private ventasService: VentasService
  ) {
   }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarHistoricoCliente();
  }

// ==================================================
// Carga
// ==================================================

cargarHistoricoCliente() {

    this.alertService.cargando = true;

    this.clientesService.cargarHistoricoCliente( this.desde , this.IdPersona )
               .subscribe( {
                next: (resp: any) => {

                  if(resp[3][0].mensaje == 'Ok')
                  { 
                    this.apellidos = resp[2][0].apellidos;
                    this.nombres = resp[2][0].nombres;

                    // this.saldo = resp[3][0].saldo;
    
                    this.movimientos = resp[0];

                    this.totalMovimientos = resp[1][0].cantidad_transacciones;
                    this.alertService.cargando = false;

                    return;
                  } else {
                    this.alertService.alertFail('Ocurrio un error',false,2000);
                    this.alertService.cargando = false;
                  }
                  this.alertService.cargando = false;

                  return;
                 },
                error: () => { 
                  this.alertService.alertFail('Ocurrio un error',false,2000);
                  this.alertService.cargando = false;

                }
              });

  }



// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalMovimientos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.cargarHistoricoCliente();

}


}
