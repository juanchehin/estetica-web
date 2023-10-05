import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styles: []
})
export class EditarEmpleadoComponent implements OnInit {

  IdPersona: any;
  Apellidos: any;
  Nombres: any;
  Telefono: any;
  DNI: any;        
  Email: any;
  Observaciones: any;
  direccion: any;   
  fecha_nac: any;

  constructor(
    private router: Router, 
    public empleadosService: EmpleadosService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarDatosFormEditarEmpleado();
  }

// ==================================================
//        Crear 
// ==================================================

editarEmpleado() {

  this.alertService.cargando = true;

      const empleadoEditado = new Array(
        this.Apellidos,
        this.Nombres,
        this.Telefono,
        this.DNI,        
        this.Email,
        this.fecha_nac, 
        this.direccion,
        this.Observaciones,
        this.IdPersona
      );

      this.empleadosService.editarEmpleado( empleadoEditado )
                .subscribe( {
                  next: (resp: any) => {
                  
                    if ( (resp != null) && (resp[0][0].mensaje == 'Ok') ) {
                      this.alertService.alertSuccess('Mensaje','Empleado actualizado',2000);
                      this.alertService.cargando = false;

                      this.router.navigate(['/dashboard/empleados']);
                    } else {
                      this.alertService.alertFail('Ocurrio un error','Contactese con el administrador',2000);
                      this.alertService.cargando = false;

                    }
                    return;
                   },
                  error: () => { 
                    this.alertService.alertFail('Ocurrio un error','Contactese con el administrador',2000);
                    this.alertService.cargando = false;
                  }
                });

            };

  // ==================================================
// Carga
// ==================================================

cargarDatosFormEditarEmpleado() {

  this.alertService.cargando = true;

    this.empleadosService.cargarDatosFormEditarEmpleado( this.IdPersona )
               .subscribe( {
                next: (resp: any) => {
                  
                this.Apellidos = resp[0][0].apellidos;
                this.Nombres = resp[0][0].nombres;
                this.Telefono = resp[0][0].telefono;
                this.DNI = resp[0][0].dni;
                this.Email = resp[0][0].email;
                this.Observaciones = resp[0][0].observaciones;
                this.direccion = resp[0][0].direccion;
             
                this.alertService.cargando = false;

              },
              error: () => { 
                this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
                this.alertService.cargando = false;
            }
            });

        };
}
