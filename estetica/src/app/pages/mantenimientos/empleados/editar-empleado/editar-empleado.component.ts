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

      const empleadoEditado = new Array(
        this.Apellidos,
        this.Nombres,
        this.Telefono,
        this.DNI,        
        this.Email,
        this.Observaciones,
        this.IdPersona
      );

      this.empleadosService.editarEmpleado( empleadoEditado )
                .subscribe( {
                  next: (resp: any) => {
                  
                    if ( (resp != null) && (resp[0][0].mensaje == 'Ok') ) {
                      this.alertService.alertSuccess('top-end','Empleado actualizado',2000);
                      this.router.navigate(['/dashboard/empleados']);
                    } else {
                      // this.alertService.alertFailWithText('Ocurrio un error. ','Contactese con el administrador',false,2000);
                    }
                    return;
                   },
                  error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
                });

            };

  // ==================================================
// Carga
// ==================================================

cargarDatosFormEditarEmpleado() {

    this.empleadosService.cargarDatosFormEditarEmpleado( this.IdPersona )
               .subscribe( {
                next: (resp: any) => {
                  
                this.Apellidos = resp[0][0].apellidos;
                this.Nombres = resp[0][0].nombres;
                this.Telefono = resp[0][0].telefono;
                this.DNI = resp[0][0].dni;
                this.Email = resp[0][0].email;
                this.Observaciones = resp[0][0].observaciones;
             
              },
              error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
            });

        };
}
