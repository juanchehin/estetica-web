import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarGastosComponent } from './gastos/listar-gastos/listar-gastos.component';
import { NuevoGastoComponent } from './gastos/nuevo-gasto/nuevo-gasto.component';

const routes: Routes = [
  //
  { path: 'gastos', component: ListarGastosComponent, data: { titulo: 'Listado de gastos' }},
  { path: 'gastos/nuevo', component: NuevoGastoComponent, data: { titulo: 'Nuevo gasto' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
