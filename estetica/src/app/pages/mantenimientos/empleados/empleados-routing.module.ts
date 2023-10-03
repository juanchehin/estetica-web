import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EditarEmpleadoComponent } from './editar-empleado/editar-empleado.component';
import { HistoricoEmpleadoComponent } from './historico-empleado/historico-empleado.component';


const routes: Routes = [
  { path: '', component: EmpleadosComponent, data: { titulo: 'Listado de empleados' }},
  { path: 'nuevo', component: EmpleadoComponent, data: { titulo: 'Nuevo empleado' }},
  { path: 'editar/:IdPersona', component: EditarEmpleadoComponent, data: { titulo: 'Edicion de empleado' }},
  { path: 'historico/:IdPersona', component: HistoricoEmpleadoComponent, data: { titulo: 'Trabajos del empleado' }}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
