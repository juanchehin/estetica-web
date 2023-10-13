import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
// var $ = require( "jquery" );
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: any;
  banderaOcultarSidebar = false;

  titulo_sucursal = 'Estetica - ';
  bandera_bazar = false;

  constructor( private authService: AuthService,
              public alertService: AlertService,
               private router: Router ) {
  }

  ngOnInit() {
    this.cargar_titulo();
  };

  logout() {
    this.authService.logout();
  }

  buscar( termino: string ) {

    if ( termino.length === 0  ) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);
  }

  cargar_titulo(  ) {

    this.titulo_sucursal += localStorage.getItem('sucursal');
    
    if(localStorage.getItem('sucursal') === 'Bazar')
    {
      this.bandera_bazar = true;
    }

  }


}
