import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { EditarProductoComponent } from './productos/editar-producto.component';
import { ProductoComponent } from './productos/producto.component';


const routes: Routes = [
   // Productos
   { path: '', component: ProductosComponent, data: { titulo: 'Productos' }},
   { path: 'nuevo', component: ProductoComponent, data: { titulo: 'Nuevo Producto' }},
   { path: 'editar/:IdProducto', component: EditarProductoComponent, data: { titulo: 'Edicion de producto' }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
