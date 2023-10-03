import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styles: []
})
export class ConfiguracionesComponent implements OnInit {

  porcentaje_comision = 0;
  empresa: any;
  direccion_empresa: any;
  cuit: any;
  telefono_empresa: any;
  ing_brutos: any;

  constructor(
    public configuracionesService: ConfiguracionesService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.cargar_configuraciones();
  }

  // ======================================
  //
  // ======================================
  cargar_configuraciones(){
          this.configuracionesService.cargarConfiguraciones(  )
                .subscribe( {
                  next: (resp: any) => {

                    if((resp[1][0].mensaje == 'Ok')) {

                      this.porcentaje_comision = resp[0][0].comision_empleado;
                      this.empresa = resp[0][0].empresa;
                      this.direccion_empresa = resp[0][0].direccion_empresa;
                      this.cuit = resp[0][0].CUIT;
                      this.telefono_empresa = resp[0][0].telefono_empresa;
                      this.ing_brutos = resp[0][0].ing_brutos;
                      
                    } else {                      
                      this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                    }            
            },
            error: () => { 
              this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) 
            }
          });

      };

  // ======================================
  //
  // ======================================
  actualizarConfiguraciones() {

    const configuraciones = [
      this.porcentaje_comision,
      this.empresa,
      this.direccion_empresa,
      this.cuit,
      this.telefono_empresa,
      this.ing_brutos
    ]

    this.configuracionesService.actualizarConfiguracion( configuraciones )
              .subscribe( {
                next: (resp: any) => { 

                  if ( resp[0][0].mensaje === 'Ok') {
                    this.alertService.alertSuccess('Mensaje','Configuracion guardada',2000);
                    this.cargar_configuraciones();
                  } else {
                    this.alertService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
                  }
                  return;
                 },
                error: () => { 
                  this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) 
                }
              });
                
            }


}
