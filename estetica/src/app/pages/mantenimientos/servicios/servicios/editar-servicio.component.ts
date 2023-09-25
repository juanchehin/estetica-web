import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CategoriasService } from '../../../../services/categorias.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styles: []
})
export class EditarServicioComponent implements OnInit {

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
  IdServicio: any;

  // ==============================
  IdCategoria: any;
  IdSubCategoria: any;
  IdMarca: any;
  IdUnidad: any;        
  Servicio: any;
  IdProveedor: any;
  FechaVencimiento: any;
  Descripcion: any;
  StockAlerta: any;
  Medida: any;
  PrecioCompra: any;
  PrecioVenta: any;
  PrecioMayorista: any;
  PrecioMeli: any;
  Descuento: any;
  Moneda: any;
  servicio: any;

  // sabores
  sabores: any;
  keywordSabor = 'Sabor';
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
    public categoriasService: CategoriasService,
    public alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.IdServicio = this.activatedRoute.snapshot.paramMap.get('IdServicio');
    this.cargarDatosFormEditarServicio();

  }

// ==================================================
//        Crear 
// ==================================================

altaServicio() {

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

      const servicioEditado = new Array(
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

      console.log("servicioEditado es : ",servicioEditado)

      // this.serviciosService.editarServicio( servicioEditado )
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

cargarDatosFormEditarServicio() {

    // this.serviciosService.cargarDatosFormEditarServicio( this.IdServicio )
    //            .subscribe( (resp: any) => {

    //             console.log("resp editar perod es : ",resp)

    //             this.marcas = resp[0];
    //             this.categorias = resp[1];
    //             this.unidades = resp[2];
    //             this.proveedores = resp[3];
    //             this.sucursalPrincipal = resp[4][0].Sucursal;
    //             this.sabores = resp[5];
    //             this.servicio = resp[6][0];
    //             this.sabores_cargados = resp[7];

    //             this.IdCategoria = this.servicio.IdCategoria;
    //             this.IdSubCategoria = this.servicio.IdSubCategoria;
    //             this.IdMarca = this.servicio.IdMarca;
    //             this.IdUnidad = this.servicio.IdUnidad;        
    //             this.Servicio = this.servicio.Servicio;
    //             this.IdProveedor = this.servicio.IdProveedor;
    //             this.FechaVencimiento = this.servicio.Fecha_vencimiento;
    //             this.Descripcion = this.servicio.Descripcion;
    //             this.StockAlerta = this.servicio.StockAlerta;
    //             this.Medida = this.servicio.Medida;
    //             this.PrecioCompra = this.servicio.PrecioCompra;
    //             this.PrecioVenta = this.servicio.PrecioVenta;
    //             this.PrecioMayorista = this.servicio.PrecioMayorista;
    //             this.PrecioMeli = this.servicio.PrecioMeli;
    //             this.Descuento = this.servicio.Descuento;
    //             this.Moneda = this.servicio.Moneda;

    //           });

  }

  
// ==================================================
// Carga la subcategorias segun la categoria seleccionada
// ==================================================

cargarSubcategoriaIdCategoria(IdCategoria: any) {

    this.categoriasService.cargarSubcategoriaIdCategoria( IdCategoria )
               .subscribe( (resp: any) => {

                this.subcategorias = resp[0];

              });

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
      if(item.IdServicio === IdServicio) 
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

  console.log("this.itemPendiente : ",this.itemPendiente)

  if(this.itemPendiente.Sabor == '')
  { 
    this.alertService.alertFail('Debe elegir un sabor',false,900)
    return;
  }

  console.log("this.codigoLineaSabor : ",this.codigoLineaSabor)

  if(this.codigoLineaSabor == '' || this.codigoLineaSabor == undefined)
  { 
    this.alertService.alertFail('Debe cargar un codigo',false,900)
    return;
  }

  if(this.itemPendiente.length <= 0)
  { 
    this.alertService.alertFail('Debe cargar sabor/codigo',false,900)
    return;
  }
  
  const checkExistsLineaSabor = this.sabores_cargados.find((sabor_cargado: any) => {
    return sabor_cargado.IdSabor == this.itemPendiente.IdSabor;
  });


  if(!(checkExistsLineaSabor != undefined))
  {
    this.sabores_cargados.push(
      {
        IdSabor: Number(this.itemPendiente.IdSabor),
        Sabor: this.itemPendiente.Sabor,
        Servicio: this.itemPendiente.Servicio,
        Codigo: this.codigoLineaSabor,
        PrecioVenta: this.itemPendiente.PrecioVenta,
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

  onChangeSearch(val: any) {
    this.saborBuscado = val;
    // this.cargarSabores();
  }
  
}
