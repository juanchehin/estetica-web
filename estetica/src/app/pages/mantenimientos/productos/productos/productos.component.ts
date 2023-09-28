import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SucursalesService } from 'src/app/services/sucursal.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  desde = 0;
  totalAsistencias = true;
  ClasesDisponibles = 0;
  IdSucursal = 1;
  productos!: any;
  sucursales: any;
  totalProductos = 0;
  id_producto_seleccionado: any;

  @ViewChild('inputProductoBuscado') inputProductoBuscado!: ElementRef;

  constructor(
    public productosService: ProductosService,
    private sucursalesService: SucursalesService,
    public alertaService: AlertService
  ) {
   }

  ngOnInit() {
    this.buscarProducto();
    this.cargarSucursales();
  }

// ==================================================
// Carga
// ==================================================

buscarProducto() {

    const inputElement: HTMLInputElement = document.getElementById('buscarProducto') as HTMLInputElement;
    const productoBuscado: any = inputElement.value || '-';

    this.productosService.listarProductosPaginado( this.desde , this.IdSucursal, productoBuscado  )
               .subscribe( {
                next: (resp: any) => { 

                  if(resp[0].length <= 0)
                  { 
                    this.productos = [];
                    this.totalProductos = 0;
                    
                    return;
                  }
  
                  if ( resp[2][0].mensaje == 'Ok') {
                    
                    this.totalProductos = resp[1][0].cantProductosBuscados;
                    this.productos = resp[0];
                  } else {
                    this.alertaService.alertFail('Ocurrio un error',false,2000);
                  }
                  return;
                 },
                error: () => { 
                  this.alertaService.alertFail('Ocurrio un error',false,2000)
                }
              });

  }

// ==================================================
// Carga
// ==================================================

cargarSucursales() {


  this.sucursalesService.listarTodasSucursales(   )
             .subscribe( (resp: any) => {

              this.sucursales  = resp[0];

            });

}

// ==================================================
//        Cambio de valor
// ==================================================

cambiarDesde( valor: number ) {

  const desde = this.desde + valor;

  if ( desde >= this.totalProductos ) {
    return;
  }

  if ( desde < 0 ) {
    return;
  }

  this.desde += valor;
  this.buscarProducto();

}


// ==================================================
//    Funcion para recargar el listado
// ==================================================

refrescar() {
  // Reseteo 'desde' a cero
  this.inputProductoBuscado.nativeElement.value = '';
  
  this.desde = 0;
  this.IdSucursal = 1;
  this.buscarProducto();

}


// ==================================================
// 
// ==================================================

baja_producto() {

  this.productosService.bajaProducto( this.id_producto_seleccionado )
  .subscribe({
    next: (resp: any) => {

      if((resp[0].Mensaje == 'Ok')) {

        this.alertaService.alertSuccess('Eliminacion','Producto dada de baja',3000);
        
        // let el: HTMLElement = this.divCerrarModalBajaTransaccion.nativeElement;
        // el.click();

        this.refrescar();
        
      } else {
        
        this.alertaService.alertFailWithText('Error','Ocurrio un error al procesar el pedido',1200);
        
      }
     },
    error: (resp: any) => {  

      this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
    
    }
  });
  
  }

// ==================================================
// 
// ==================================================

modal_baja_producto(id_producto: string) {

  this.id_producto_seleccionado = id_producto;

}
}
