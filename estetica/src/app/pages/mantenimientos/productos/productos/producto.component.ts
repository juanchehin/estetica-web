import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { UnidadesService } from '../../../../services/unidades.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  cargando = true;

  // ==============================
  producto = '';
  codigo = '';
  stock = '0';
  precio_compra = '0';
  precio_venta = '0';
  observaciones = '-';
  
  constructor(
    private router: Router, 
    public productosService: ProductosService, 
    public activatedRoute: ActivatedRoute,
    public unidadesService: UnidadesService,
    public alertService: AlertService
    ) {

  }

  ngOnInit() {
  }

// ==================================================
//        Crear 
// ==================================================

alta_producto() {
  
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
        this.producto,
        this.codigo,
        this.stock,
        this.precio_compra,
        this.precio_venta,
        this.observaciones
      );

      this.productosService.altaProducto( producto )
                .subscribe( {
                  next: (resp: any) => { 
                    
                    if ( resp[0][0].mensaje === 'Ok') {
                      this.alertService.alertSuccess('Mensaje','Producto cargado',2000);
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

}
