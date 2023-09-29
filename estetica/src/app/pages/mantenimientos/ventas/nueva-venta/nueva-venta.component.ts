import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItemVentaStructure } from 'src/app/interfaces/item-venta.interface';
import { IItemTipoPagoStructure } from 'src/app/interfaces/item_tp.interface';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import { UtilService } from '../../../../services/util.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: []
})
export class NuevaVentaComponent implements OnInit {

  currentDate = new Date();

  keywordCliente = 'NombreCompleto';
  keywordProducto = 'producto';

  descuentoEfectivo: any = 0;
  productos: any;
  clienteBuscado = '';
  productoBuscado = '';
  IdPersona = '';
  local = '';
  lineas_venta: IItemVentaStructure[] = [];
  checkExists: IItemVentaStructure[] = [];
  lineas_tipos_pago: IItemTipoPagoStructure[] = [];  
  itemPendienteServicio: any = [];
  itemPendienteProducto: any = [];

  tiposPago: any;
  clientes = [];
  datosVendedor: any;
  totalVenta: number = 0;
  IdItem = 0;
  IdItemTipoPago = 0;
  IdTipoPagoSelect = 0;
  monto = 0;
  totalTiposPagoRestante = 0;
  cantidadLineaVentaProducto = 1;

  IdCliente = 0;
  arrayVenta: any = [];
  itemCheckExists: any = 0;
  itemIdProductoSabor: any;
  idSucursalVendedor: any;
  fecha_venta: any;

  // Servicios
  servicios: any;
  keywordServicio = 'servicio';
  servicioBuscado = '';
  cantidadLineaVentaServicio = 1;

  // Empleados
  empleados: any;
  keywordEmpleado = 'empleado';
  empleadoBuscado = '';
  IdEmpleado = 0;


  // Modals
  activarModal = false;
  activarModalDescuentoEfectivo = false;
  @ViewChild('divCerrarModal') divCerrarModal!: ElementRef<HTMLElement>;
  @ViewChild('divCerrarModalDescuentoEfectivo') divCerrarModalDescuentoEfectivo!: ElementRef<HTMLElement>;
  @ViewChild('buttonAbrirModalDescuentoEfectivo') buttonAbrirModalDescuentoEfectivo!: ElementRef<HTMLElement>;
  @ViewChild('divCerrarModalFormaPago') divCerrarModalFormaPago!: ElementRef<HTMLElement>;

  // =====
  totalTiposPago = 0;


  constructor(
    public productosService: ProductosService, 
    public serviciosService: ServiciosService,
    public ventasService: VentasService, 
    public authService: AuthService, 
    public usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public clientesService: ClientesService,
    public empleadosService: EmpleadosService,
    public alertaService: AlertService,
    private utilService: UtilService,
    private router: Router
    ) {
    
  }

  ngOnInit() {   
    // this.resetearVariables();
    this.fecha_venta = this.utilService.formatDateNow(new Date(Date.now()));
    this.IdPersona = this.authService.IdPersona;
    this.datosVendedor = [];
    this.idSucursalVendedor = localStorage.getItem('id_sucursal');
    // this.cargarDatosVendedor();
  }
  
// ==================================================
//        Crear 
// ==================================================

altaVenta() {
  
  this.IdPersona = this.authService.IdPersona;

  if((this.IdTipoPagoSelect == undefined) ||(this.IdTipoPagoSelect <= 0))
  { 
    this.alertaService.alertFail('Mensaje','Tipo de pago invalido',2000);
    return;
  }

      this.arrayVenta.push(        
        this.IdCliente,
        this.IdEmpleado,
        this.lineas_venta,
        this.totalVenta,
        this.IdTipoPagoSelect,
        this.fecha_venta
      );

      this.ventasService.altaVenta(  this.arrayVenta )
      .subscribe({
        next: (resp: any) => {
          
          if ( resp.Mensaje == 'Ok') {
            this.alertaService.alertSuccess('Mensaje','Venta cargada',2000);

            let el: HTMLElement = this.divCerrarModalFormaPago.nativeElement;
            el.click();

            // this.resetearVariables();
            this.router.navigate(['/dashboard']);

            
          } else {
            this.alertaService.alertFail('Ocurrio un error',false,2000);
          }
          return;
         },
        error: () => { this.alertaService.alertFail('Ocurrio un error',false,2000) }
      });

}

// ==================================================
// Carga
// ==================================================

cargarClientes() {

    this.clientesService.cargarClientes( this.clienteBuscado )
               .subscribe( (resp: any) => {

                this.clientes = resp;

              });

  }

  // ==================================================
// Carga
// ==================================================

cargarEmpleados() {

  this.empleadosService.cargarEmpleados( this.empleadoBuscado )
             .subscribe( (resp: any) => {

              this.empleados = resp;

            });

}
// ==================================================
// Autocompletar de productos
// ==================================================

cargarProductos() {

  this.productosService.cargarProductos( this.productoBuscado, this.idSucursalVendedor )
             .subscribe( (resp: any) => {

              this.productos = resp[0];

            });

}

// ==================================================
// Autocompletar de servicios
// ==================================================

cargarServicios() {

  this.serviciosService.cargarServicios( this.servicioBuscado, this.idSucursalVendedor )
             .subscribe( (resp: any) => {

              this.servicios = resp[0];

            });

}
// ==================================================
// Carga
// ==================================================
cargarTiposPago() {

  this.ventasService.cargarTiposPago( )
             .subscribe( {
              next: (resp: any) => { 
              
              this.tiposPago = resp[0];

            },
            error: (err: any) => {
              this.alertaService.alertFail('Ocurrio un error al cargar los tipos de pago ' + err,false,400); }
          });

}

// ==================================================
// Carga los datos de la persona que esta realizando la venta
//  junto con la sucursal en la cual se desempeña
// ==================================================

cargarDatosVendedor() {
  
    this.usuariosService.cargarDatosVendedor(  this.IdPersona )
               .subscribe( {

                next: (resp: any) => { 

                  this.datosVendedor = resp[0][0];
                  this.fecha_venta = this.utilService.formatDateNow(resp[1][0].fecha_bd);

                  this.idSucursalVendedor = this.datosVendedor.IdSucursal;
                },
                error: (err: any) => {
                  this.alertaService.alertFail('Ocurrio un error al cargar los datos del vendedor' + err,false,400); }
              });

  }

// ==================================================
// 
// ==================================================
  cambiaCantidadVentaProducto(cantidad: any) {
    
    // this.cantidadLineaVenta = cantidad.data;
    
  }
  
  // ==================================================
// 
// ==================================================
cambiaCantidadVentaServicio(cantidad: any) {
    
  // this.cantidadLineaVenta = cantidad.data;
  
}
// ==================================================
// 
// ==================================================
agregarLineaVentaProducto() {

  if(isNaN(Number(this.cantidadLineaVentaProducto)))
  { 
    this.alertaService.alertFail('Error en cantidad',false,2000);
    return;
  }

  if((this.itemPendienteProducto.Stock <= 0) || (this.itemPendienteProducto.Stock < this.cantidadLineaVentaProducto))
  { 
    this.alertaService.alertFail('Stock insuficiente para ' + this.itemPendienteProducto.Producto,false,2000);
    return;
  }

  if(this.itemPendienteProducto.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un producto en el buscador',2000);
    return;
  }

  this.totalVenta += Number(this.itemPendienteProducto.precio_venta) * this.cantidadLineaVentaProducto;

  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    if((linea_venta.IdProductoServicio == this.itemPendienteProducto.id_producto) && (linea_venta.tipo == 'producto'))
    {
      return true;
    }else{
      return false;
    }
  });
  

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(this.itemPendienteProducto.id_producto),
        codigo: this.itemPendienteProducto.Codigo,
        producto_servicio: this.itemPendienteProducto.producto,
        cantidad: this.cantidadLineaVentaProducto,
        precio_venta: this.itemPendienteProducto.precio_venta,
        tipo: 'producto'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaVentaProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;

    for (let item of this.lineas_venta) {

      if(this.itemPendienteProducto.Stock < (Number(item.cantidad) + Number(this.cantidadLineaVentaProducto)))
      { 
        this.alertaService.alertFail('Mensaje','Stock insuficiente para ' + this.itemPendienteProducto.Producto,3000);
        return;
      }

      if((item.IdProductoServicio == this.itemCheckExists.IdProductoServicio)  && (item.tipo == 'producto'))
      { 
        item.cantidad = Number(item.cantidad) + Number(this.cantidadLineaVentaProducto);

      }
     }
  }
 

}

// ==================================================
// 
// ==================================================
agregarLineaVentaServicio() {

  if(isNaN(Number(this.cantidadLineaVentaServicio)))
  { 
    this.alertaService.alertFail('Error en cantidad',false,2000);
    return;
  }


  if(this.itemPendienteServicio.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un servicio en el buscador',2000);
    return;
  }

  this.totalVenta += Number(this.itemPendienteServicio.precio) * this.cantidadLineaVentaServicio;

  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    if((linea_venta.IdProductoServicio == this.itemPendienteServicio.id_servicio) && (linea_venta.tipo == 'servicio'))
    {
      return true;
    }else{
      return false;
    }
  });

  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(this.itemPendienteServicio.id_servicio),
        codigo: this.itemPendienteServicio.Codigo,
        producto_servicio: this.itemPendienteServicio.servicio,
        cantidad: this.cantidadLineaVentaServicio,
        precio_venta: this.itemPendienteServicio.precio,
        tipo: 'servicio'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaVentaProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;

    for (let item of this.lineas_venta) {

      if((item.IdProductoServicio == this.itemCheckExists.IdProductoServicio) && (item.tipo == 'servicio'))
      { 
        item.cantidad = Number(item.cantidad) + Number(this.cantidadLineaVentaServicio);
      }
     }
  }
 

}
// ==================================================
// Carga
// ==================================================
agregarLineaTipoPago(): any {
  
  if(this.monto > this.totalVenta)
  {
    this.alertaService.alertFail('El monto es mayor que el total de la venta',false,2000);
    return;
  }
  
  if((this.totalTiposPago + +this.monto) > this.totalVenta)
  {
    this.alertaService.alertFail('El monto total es mayor que el total de la venta',false,2000);
    return;
  }

  if((Number(this.monto) <= 0) || (this.monto == undefined))
    {
      this.alertaService.alertFail('Debe seleccionar un monto',false,2000);
      return;
    }

}

// ==============================
  // Para empleados
  // ================================
  selectEventEmpleado(item: any) {
    this.IdEmpleado = item.id_persona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearchEmpleado(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.empleadoBuscado = val;
    this.cargarEmpleados();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  // ==============================
  // Para cliente
  // ================================
  
  selectEventCliente(item: any) {
    this.IdCliente = item.id_persona;
    // this.agregarLineaVenta(item);
    // do something with selected item
  }

  onChangeSearchCliente(val: any) {

    if(val == '' || val == null)
    {
      return;
    }

    this.clienteBuscado = val;

    this.cargarClientes();
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any){
    // console.log("pasa on onFocused",e)
    // do something when input is focused
  }

  // ==============================
  // Para productos
  // ================================
  selectEventProducto(item: any) {
    
    this.itemPendienteProducto = item;
  }

  onChangeSearchProducto(val: any) {
    if(val == '' || val == null)
    {
      return;
    }
    this.productoBuscado = val;
    this.cargarProductos();
  }
  
  onFocusedProducto(e: any){
  }

    // ==============================
  // Para servicios
  // ================================
  selectEventServicio(item: any) {
    
    this.itemPendienteServicio = item;
  }

  onChangeSearchServicio(val: any) {
    if(val == '' || val == null)
    {
      return;
    }
    this.servicioBuscado = val;
    this.cargarServicios();
  }
  
  onFocusedServicio(e: any){
  }


  // ==============================
  // 
  // ================================
  continuarVenta()
  {

    if(this.totalVenta <= 0)
    {
      this.alertaService.alertFail('El total de la venta debe ser mayor que cero',false,2000);
      return;
    }

    if((Number(this.IdCliente) <= 0) || (this.IdCliente == undefined))
    {
      this.alertaService.alertFail('Debe seleccionar un cliente',false,2000);
      return;
    }

    // this.total_venta_inicial = this.totalVenta;
    this.activarModal = true;

    this.cargarTiposPago();
  }
  // ==============================
  // 
  // ================================
  eliminarItemVenta(pIdProductoServicio: any){

    this.lineas_venta.forEach( (item, index) => {
      if(item.IdProductoServicio == pIdProductoServicio) 
      {
        this.totalVenta -= item.precio_venta * item.cantidad;
        this.lineas_venta.splice(index,1);
      }
        
    });

  }

  // ==============================
  // 
  // ================================
  cerrarModalDescuentoEfectivo(){
    let el: HTMLElement = this.divCerrarModalDescuentoEfectivo.nativeElement;
    el.click();
  }

  onChangeTipoPago(val: any){
    this.IdTipoPagoSelect = val;
  }

  
  // ==============================
  // 
  // ================================
  cerrarModal(){
    let el: HTMLElement = this.divCerrarModal.nativeElement;
    el.click();
  }


}

