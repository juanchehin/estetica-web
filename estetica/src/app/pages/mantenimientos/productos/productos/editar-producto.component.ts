import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styles: []
})
export class EditarProductoComponent implements OnInit {

  // ==============================
  producto = '';
  codigo = '';
  stock = '0';
  precio_compra = '0';
  precio_venta = '0';
  observaciones = '-';
  id_producto: any;
  

  constructor(
    private router: Router, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public categoriasService: CategoriasService,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.id_producto = this.activatedRoute.snapshot.paramMap.get('IdProducto');
    this.cargarDatosFormEditarProducto();

  }

// ==================================================
//        Crear 
// ==================================================

update_producto() {
  
  //** */
  if((this.producto.length <= 0 || this.producto == '') ){
    this.alertService.alertFailWithText('Atencion','Debe cargar un nombre para el producto',2000);
    return;
  }
  //** */
  if((this.precio_compra > this.precio_venta) ){
    this.alertService.alertFailWithText('Error','El precio compra debe ser menor al precio venta',1200);
    return;
  }
  
  const producto = new Array(
    this.id_producto,
    this.producto,
    this.codigo,
    this.stock,
    this.precio_compra,
    this.precio_venta,
    this.observaciones
    );
    
  this.productosService.editarProducto( producto )
            .subscribe( {
              next: (resp: any) => {
                
                if ( resp[0][0].mensaje === 'Ok') {
                  this.alertService.alertSuccess('Mensaje','Producto actualizado',2000);
                  this.router.navigate(['/dashboard/productos']);
                } else {
                  this.alertService.alertFail('Mensaje','Ocurrio un error. Contactese con el administrador',2000);
                }
                return;
               },
              error: () => { 
                this.alertService.alertFail('Mensaje','Ocurrio un error. Contactese con el administrador',2000);
              }
            });

        }

// ==================================================
// Carga
// ==================================================

cargarDatosFormEditarProducto() {

    this.productosService.cargarDatosFormEditarProducto( this.id_producto )
               .subscribe(  {

                next: (resp: any) => { 
                
                  if ( resp[1][0].mensaje === 'Ok') {

                    this.producto = resp[0][0].producto;
                    this.codigo = resp[0][0].codigo;
                    this.stock = resp[0][0].stock;
                    this.precio_compra = resp[0][0].precio_compra;
                    this.precio_venta = resp[0][0].precio_venta;
                    this.observaciones = resp[0][0].descripcion;

                  } else {
                    this.alertService.alertFail('Mensaje','Ocurrio un error. Contactese con el administrador',2000);
                  }
                  return;
                 },
                error: () => { 
                  this.alertService.alertFail('Mensaje','Ocurrio un error. Contactese con el administrador',2000);
                }
              });
  
  }

  
}
