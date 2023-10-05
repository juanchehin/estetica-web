import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styles: []
})
export class EditarClienteComponent implements OnInit {

  IdPersona: any;
  Apellidos: any;
  Nombres: any;
  Telefono: any;
  DNI: any;        
  Email: any;
  direccion: any;
  Observaciones: any;   

  constructor(
    private router: Router, 
    public clientesService: ClientesService, 
    public activatedRoute: ActivatedRoute,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdPersona = this.activatedRoute.snapshot.paramMap.get('IdPersona');
    this.cargarDatosFormEditarCliente();
  }

// ==================================================
//        Crear 
// ==================================================

editarCliente() {

  this.alertService.cargando = true;

      const clienteEditado = new Array(
        this.Apellidos,
        this.Nombres,
        this.Telefono,
        this.DNI,        
        this.Email,
        this.direccion,
        this.Observaciones,
        this.IdPersona
      );

      this.clientesService.editarCliente( clienteEditado )
                .subscribe( {
                  next: (resp: any) => {
                  
                    if ( (resp != null) && (resp[0][0].mensaje == 'Ok') ) {
                      this.alertService.alertSuccess('Mensaje','Cliente actualizado',2000);
                      this.router.navigate(['/dashboard/clientes']);
                      this.alertService.cargando = false;

                    } else {
                      this.alertService.alertFailWithText('Ocurrio un error. ','Contactese con el administrador',2000);
                      this.alertService.cargando = false;

                    }
                    this.alertService.cargando = false;

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

cargarDatosFormEditarCliente() {

    this.clientesService.cargarDatosFormEditarCliente( this.IdPersona )
               .subscribe( {
                next: (resp: any) => {
                  
                this.Apellidos = resp[0][0].apellidos;
                this.Nombres = resp[0][0].nombres;
                this.Telefono = resp[0][0].telefono;
                this.DNI = resp[0][0].dni;
                this.Email = resp[0][0].email;
                this.direccion = resp[0][0].direccion;
                this.Observaciones = resp[0][0].observaciones;
             
              },
              error: () => { this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000) }
            });

        };
}
