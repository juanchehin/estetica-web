import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
// Mantenimientos
// import { PedidosComponent } from './mantenimientos/pedidos/pedidos/pedidos.component';
import { LoginGuardGuard } from '../guards/login-guard.guard';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';



const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { 
    path: 'productos',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'productos'},
    loadChildren: () => import('./mantenimientos/productos/productos-routing.module').then( m => m.ProductosRoutingModule )
  },
  { 
    path: 'compras',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'compras'},
    loadChildren: () => import('./mantenimientos/compras/compras-routing.module').then( m => m.ComprasRoutingModule )
  },
  { 
    path: 'ventas',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'ventas'},
    loadChildren: () => import('./mantenimientos/ventas/ventas-routing.module').then( m => m.VentasRoutingModule )
  },
  { 
    path: 'clientes',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/clientes/clientes-routing.module').then( m => m.ClientesRoutingModule )
  },
  { 
    path: 'empleados',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/empleados/empleados-routing.module').then( m => m.EmpleadosRoutingModule )
  },
  { 
    path: 'servicios',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    loadChildren: () => import('./mantenimientos/servicios/servicios-routing.module').then( m => m.ServiciosRoutingModule )
  },
  { 
    path: 'configuraciones',
    canActivate: [LoginGuardGuard, VerificaTokenGuard],
    data: { ruta: 'configuraciones'},
    loadChildren: () => import('./mantenimientos/configuraciones/configuraciones-routing.module').then( m => m.ConfiguracionesRoutingModule )
  }
 
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
