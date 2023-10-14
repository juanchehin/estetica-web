import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
// import { IMenuStructure } from 'src/app/interfaces/menu.model';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  correoActual: any;
  elementosMenuPadre: any[] = [];
  IdPersona: any;
  menu: any[] = [];
  ocultarSidebar: boolean | undefined;
  expandirProductos = true;
  expandirVentas = true;
  expandirCompras = true;
  expandirTransferencias = true;
  expandirClientes = true;
 
  constructor( 
              public alertService: AlertService,
              public sidebarService: SidebarService,
              public authService: AuthService
            ) {}

  ngOnInit(): void {
    this.IdPersona = this.authService.IdPersona;
  }

  logout() {
    this.authService.logout();
  }

}
