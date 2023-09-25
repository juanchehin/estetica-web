import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UnidadesService } from '../../../../services/unidades.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styles: []
})
export class ServicioComponent implements OnInit {

  cargando = true;
  marcas: any;
  categorias: any;
  banderaGenerarCodigo = false;
  unidades: any;
  alertaPrecioVentaCompra = false;
  alertaPrecioVentaMayorista = false;
  alertaPrecioVentaMeli = false;
  sucursalPrincipal: any;
  proveedores: any;
  IdCategoriaSeleccionada: any;
  subcategorias: any;
  deshabilitarSubcategorias = true;
  alertaCodigoVacio = false;
  alertaFechaVencimiento = false;

  // ==============================
  IdCategoria = '1';
  IdSubCategoria = '1';
  IdMarca = '1';
  IdUnidad = '1';        
  Servicio = '';
  IdProveedor = '3';
  FechaVencimiento: any;
  Descripcion = '-';
  StockAlerta = '5';
  Medida = '';
  PrecioCompra: any;
  PrecioVenta: any;
  PrecioMayorista: any;
  PrecioMeli: any;
  Descuento: any;
  Moneda = 'ARS';

  // sabores
  sabores: any;
  keywordSabor = 'sabor';
  sabores_cargados: any = [];
  itemPendiente: any = [];
  cantidadLineaSabor = 1;
  codigoLineaSabor: any;
  itemIdSabor: any;
  saborBuscado = '';
  itemCheckExists: any = 0;
  @ViewChild('saboresReference') saboresReference: any;
  

  constructor(
    private router: Router, 
    public serviciosService: ServiciosService, 
    public activatedRoute: ActivatedRoute,
    public unidadesService: UnidadesService,
    public alertService: AlertService
    ) {

  }

  ngOnInit() {
    this.cargarDatosFormNuevoServicio();
  }

// ==================================================
//        Crear 
// ==================================================

altaServicio() {

      //** */
      if((this.Servicio.length <= 0 || this.Servicio == '') ){
        this.alertService.alertInfoWithText('Atencion','Debe cargar un nombre para el servicio',false,2000);
        return;
      }
      //** */
      if((this.Medida.length <= 0 || this.Medida == '') ){
        this.alertService.alertInfoWithText('Atencion','Debe cargar una Medida para el servicio',false,2000);
        return;
      }
      //** */
      if((this.PrecioCompra > this.PrecioVenta) ){
        this.alertaPrecioVentaCompra = true;
        return;
      }
      else
      { 
        this.alertaPrecioVentaCompra = false;
      }
      //** */
      if(this.PrecioCompra > this.PrecioMeli)
      {
        this.alertaPrecioVentaMeli = true;
        return;
      }else
      { 
        this.alertaPrecioVentaMeli = false;
      }
      //** */
      if(this.PrecioCompra > this.PrecioMayorista)
      {
        this.alertaPrecioVentaMayorista = true;
        return;
      }else
      { 
        this.alertaPrecioVentaMayorista = false;
      }
       //** */
       if(this.FechaVencimiento < new Date())
       {
         this.alertaFechaVencimiento = true;
         return;
       }else
       { 
         this.alertaFechaVencimiento = false;
       }

      const servicio = new Array(
        this.IdCategoria,
        this.IdSubCategoria,
        this.IdMarca,
        this.IdUnidad,        
        this.Servicio,
        this.IdProveedor,
        this.FechaVencimiento,
        this.Descripcion,
        this.StockAlerta,
        this.Medida,
        this.PrecioCompra,
        this.PrecioVenta,
        this.PrecioMayorista,
        this.PrecioMeli,
        this.Descuento,
        this.Moneda,
        this.sabores_cargados
      );

      // this.serviciosService.altaServicio( servicio )
      //           .subscribe( {
      //             next: (resp: any) => { 
  
      //               console.log("resp prod : ",resp)
                  
      //               if ( resp.mensaje === 'Ok') {
      //                 this.alertService.alertSuccess('top-end','Servicio cargado',2000);
      //                 this.router.navigate(['/dashboard/servicios']);
      //               } else {
      //                 this.alertService.alertFail('Ocurrio un error. Contactese con el administrador',false,2000);
      //               }
      //               return;
      //              },
      //             error: () => { this.alertService.alertFail('Ocurrio un error',false,2000) }
      //           });

            }

// ==================================================
// Carga
// ==================================================

cargarDatosFormNuevoServicio() {

    // this.serviciosService.cargarDatosFormNuevoServicio(  )
    //            .subscribe( (resp: any) => {

    //             this.marcas = resp[0];
    //             this.categorias = resp[1];
    //             this.unidades = resp[2];
    //             this.proveedores = resp[3];
    //             this.sucursalPrincipal = resp[4][0].Sucursal;
    //             this.sabores = resp[5];

    //           });

  }

  
// ==================================================
// Carga la subcategorias segun la categoria seleccionada
// ==================================================

cargarSubcategoriaIdCategoria(IdCategoria: any) {


  }

// ==================================================
// 
// ==================================================

generarCodigo() {

  if(this.banderaGenerarCodigo == false) {
    this.codigoLineaSabor = new Date().valueOf();
  }
  else
  { 
    this.codigoLineaSabor = ''
  }

  this.banderaGenerarCodigo = !this.banderaGenerarCodigo;  
  
}
// ==================================================
// 
// ==================================================

onChangeCategorias(IdCategoria: any) {

  this.deshabilitarSubcategorias = false;
  this.cargarSubcategoriaIdCategoria(IdCategoria);
  
  
}

// ==============================
// 
// ================================
  eliminarItemSabor(IdServicio: any){

    this.sabores_cargados.forEach( (item: any, index: any) => {
      if(item.id_servicio === IdServicio) 
      {
        // this.totalVenta -= item.PrecioVenta * item.Cantidad;
        this.sabores_cargados.splice(index,1);
      }
        
    });

  }


// ==================================================
// Insera los sabores en el array
// ==================================================

agregarLineaSabor() {

  if(this.itemPendiente.Sabor == '')
  { 
    this.alertService.alertFail('Debe elegir un sabor',false,2000)
    return;
  }

  if(this.codigoLineaSabor == '' || this.codigoLineaSabor == undefined)
  { 
    this.alertService.alertFail('Debe cargar un codigo',false,2000)
    return;
  }

  if(this.itemPendiente.length <= 0)
  { 
    this.alertService.alertFail('Debe cargar sabor/codigo',false,2000)
    return;
  }
  
  const checkExistsLineaSabor = this.sabores_cargados.find((sabor_cargado: any) => {
    return sabor_cargado.id_sabor == this.itemPendiente.IdSabor;
  });


  if(!(checkExistsLineaSabor != undefined))
  {
    this.sabores_cargados.push(
      {
        id_sabor: Number(this.itemPendiente.id_sabor),
        sabor: this.itemPendiente.sabor,
        servicio: this.itemPendiente.servicio,
        codigo: this.codigoLineaSabor,
        precio_venta: this.itemPendiente.precio_venta,
      }
    );
  
  
    this.cantidadLineaSabor = 1;
  }
  else{
    this.alertService.alertFail('Sabor ya cargado',false,900)
    return;

    this.itemCheckExists = checkExistsLineaSabor;
    this.itemIdSabor = this.itemCheckExists.IdServicio;


    for (let item of this.sabores_cargados) {
      if(item.IdServicio == this.itemCheckExists.IdServicio)
      { 
        item.Cantidad = Number(item.Cantidad) + Number(this.cantidadLineaSabor);
      }
     }
  }

  this.codigoLineaSabor = '';
  this.banderaGenerarCodigo = false; 
  this.itemPendiente = [];
  this.saboresReference.clear();
  this.saboresReference.close();
  // this.keywordSabor = '';

}

  // ==============================
  // Para sabores
  // ================================
  selectEventSabor(item: any) {
    
    this.itemPendiente = item;
  }
// ================================
  onChangeSearch(val: any) {
    this.saborBuscado = val;
    // this.cargarSabores();
  }
  
}
