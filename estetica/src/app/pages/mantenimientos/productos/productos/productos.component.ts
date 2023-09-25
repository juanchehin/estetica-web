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

bajaProducto(IdProductoSabor: string) {

  // Swal.fire({
  //   title: '¿Desea eliminar el producto?',
  //   text: "Eliminacion de proveedor",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Si'
  // }).then((result: any) => {
  //   if (result.isConfirmed) {
  //     this.productosService.bajaProducto( IdProductoSabor )
  //     .subscribe({
  //       next: (resp: any) => { 

  
  //         if(resp[0][0].mensaje == 'Ok') {
  //           this.alertaService.alertSuccess('top-end','Producto dado de baja',false,900);
  //           this.buscarProducto();
            
  //         } else {
  //           this.alertaService.alertFail(resp[0][0].mensaje,false,1200);
            
  //         }
  //        },
  //       error: (resp: any) => {  this.alertaService.alertFail(resp[0][0].mensaje,false,1200); }
  //     });
  //   }
  // })
}

}
