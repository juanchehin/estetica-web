import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionesEmpresaComponent } from './configuraciones-empresa/configuraciones-empresa.component';
import { ConfiguracionesComponent } from './configuraciones/configuraciones.component';

const routes: Routes = [
  { path: '', component: ConfiguracionesComponent, data: { titulo: 'Configuraciones' }},
  { path: 'empresa', component: ConfiguracionesEmpresaComponent, data: { titulo: 'Configuraciones empresa' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule { }
