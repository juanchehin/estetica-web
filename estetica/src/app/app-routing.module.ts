import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NopagefoundComponent } from '../../../backend/panel/src/app/nopagefound/nopagefound.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },

  { path: 'productos', loadChildren: () => import('./pages/mantenimientos/productos/productos.module').then(m => m.ProductosModule) },
  // { path: 'usuarios', loadChildren: () => import('./pages/mantenimientos/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'clientes', loadChildren: () => import('./pages/mantenimientos/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
    PagesRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }