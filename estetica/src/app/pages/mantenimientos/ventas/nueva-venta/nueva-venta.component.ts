import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  itemPendiente: any = [];
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

  // =====
  porcentaje_un_pago: any;
  porcentaje_tres_pago: any;
  porcentaje_seis_pago: any;
  total_venta_inicial: any;
  porcentajeDescuentoEfectivo: any = 0;
  montoEfectivo = 0;
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
    private utilService: UtilService
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

      if ( this.totalVenta != this.totalTiposPago ) {
        this.alertaService.alertFail('Los totales no coinciden',false,2000);
        return;
      }

      this.arrayVenta.push(        
        this.IdCliente,
        this.lineas_venta,
        this.lineas_tipos_pago,
        this.totalVenta,
        this.fecha_venta
      );

      console.log("array venta es : ",this.arrayVenta)

      this.ventasService.altaVenta(  this.arrayVenta )
      .subscribe({
        next: (resp: any) => {
          
          if ( resp.mensaje[0][0].mensaje == 'Ok') {
            this.alertaService.alertSuccess('top-end','Venta cargada',2000);

            this.resetearVariables();
            
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

              this.porcentaje_un_pago = resp[1][0].tarjeta1pagos;
              this.porcentaje_tres_pago = resp[1][0].tarjeta3pagos;
              this.porcentaje_seis_pago = resp[1][0].tarjeta6pagos;

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

  if((this.itemPendiente.Stock <= 0) || (this.itemPendiente.Stock < this.cantidadLineaVentaProducto))
  { 
    this.alertaService.alertFail('Stock insuficiente para ' + this.itemPendiente.Producto,false,2000);
    return;
  }

  if(this.itemPendiente.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un producto en el buscador',2000);
    return;
  }

  this.totalVenta += Number(this.itemPendiente.precio_venta) * this.cantidadLineaVentaProducto;

  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    return linea_venta.IdProductoServicio == this.itemPendiente.IdProductoServicio;
  });
  

  console.log('this.cantidadLineaVentaProducto::: ', this.cantidadLineaVentaProducto);
  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(this.itemPendiente.IdProductoServicio),
        codigo: this.itemPendiente.Codigo,
        producto_servicio: this.itemPendiente.producto,
        cantidad: this.cantidadLineaVentaProducto,
        precio_venta: this.itemPendiente.precio_venta,
        tipo: 'producto'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaVentaProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;
    this.itemIdProductoSabor = this.itemCheckExists.IdProductoSabor;


    for (let item of this.lineas_venta) {

      if(this.itemPendiente.Stock < (Number(item.cantidad) + Number(this.cantidadLineaVentaProducto)))
      { 
        this.alertaService.alertFail('Stock insuficiente para ' + this.itemPendiente.Producto,false,2000);
        return;
      }

      if(item.IdProductoServicio == this.itemCheckExists.IdProductoServicio)
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


  if(this.itemPendiente.length <= 0)
  { 
    this.alertaService.alertFailWithText('Atencion','Debe seleccionar un servicio en el buscador',2000);
    return;
  }

  this.totalVenta += Number(this.itemPendiente.precio) * this.cantidadLineaVentaServicio;

  const checkExistsLineaVenta = this.lineas_venta.find((linea_venta) => {
    return linea_venta.IdProductoServicio == this.itemPendiente.IdProductoServicio;
  });

  console.log('this.cantidadLineaVentaServicio::: ', this.cantidadLineaVentaServicio);
  if(!(checkExistsLineaVenta != undefined))
  {
    this.lineas_venta.push(
      {
        id_item: this.IdItem,
        IdProductoServicio: Number(this.itemPendiente.IdProductoServicio),
        codigo: this.itemPendiente.Codigo,
        producto_servicio: this.itemPendiente.servicio,
        cantidad: this.cantidadLineaVentaServicio,
        precio_venta: this.itemPendiente.precio,
        tipo: 'servicio'
      }
    );

    this.IdItem += 1;
  
    this.cantidadLineaVentaProducto = 1;
  }
  else{
    this.itemCheckExists = checkExistsLineaVenta;
    this.itemIdProductoSabor = this.itemCheckExists.IdProductoSabor;

    for (let item of this.lineas_venta) {

      if(item.IdProductoServicio == this.itemCheckExists.id_servicio)
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
  var bandera = false;
  
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

  //
  let obj = this.tiposPago.find((o: any) => 
    {
      if(o.IdTipoPago == this.IdTipoPagoSelect)
      {
        return o;
      }
    }
  );

  // Busco si ya existe el IdTipoPago en el array de lineas_tipos_pago
  let exists_ltp = this.lineas_tipos_pago.find((ltp_item: any) => 
    {
      if(ltp_item.IdTipoPago == this.IdTipoPagoSelect)
      { // linea_tipo_pago existente
        // No suma el subtotal en caso de ser con tarjeta en cuotas
        if((ltp_item.IdTipoPago == 8) || (ltp_item.IdTipoPago == 9) || (ltp_item.IdTipoPago == 10))
        {
          bandera = true;
        }else
        {
          return ltp_item;
        }
      }else{
        if(
            ((this.IdTipoPagoSelect == 8) || (this.IdTipoPagoSelect == 9) || (this.IdTipoPagoSelect == 10))
            &&
            ((ltp_item.IdTipoPago == 8) || (ltp_item.IdTipoPago == 9) || (ltp_item.IdTipoPago == 10)) 
          )
          {
            bandera = true;
          }
      }
    }
  );

  if(!bandera)
  {    
    // SI existe el tipo pago en lineas_tipos_pago
    if(exists_ltp)
    {
        exists_ltp.SubTotal = +exists_ltp.SubTotal + +this.monto;
        this.totalTiposPago = this.totalTiposPago + +this.monto;  
        this.totalTiposPagoRestante = this.totalVenta - +this.totalTiposPago;

        return;
    }else
    {

      this.lineas_tipos_pago.push(
        {
            IdItem: this.IdItemTipoPago,
            IdTipoPago: this.IdTipoPagoSelect,
            TipoPago: obj.TipoPago,
            SubTotal: this.monto
        });

      switch (obj.IdTipoPago) {
        case 1: // Pago efectivo
            this.montoEfectivo = this.monto;
            this.abrirModalDescuentoEfectivo();
            this.totalTiposPago = this.totalTiposPago + +this.monto;  
            break;
        case 8: // 1 pago
            var monto_aumento = +this.monto * ((this.porcentaje_un_pago / 100)); 
            this.totalVenta = +this.totalVenta + +monto_aumento;
            this.totalTiposPago = this.totalTiposPago + +this.monto + monto_aumento;

            this.lineas_tipos_pago.push(
            {
                  IdItem: this.IdItemTipoPago,
                  IdTipoPago: 12,
                  TipoPago: 'Recargo Tarjeta',
                  SubTotal: monto_aumento
            });

            break;
        case 9: // 3 pago            
            var monto_aumento = +this.monto * ((this.porcentaje_tres_pago / 100)); 
            this.totalVenta = +this.totalVenta + +monto_aumento;
            this.totalTiposPago = this.totalTiposPago + +this.monto + monto_aumento;

            this.lineas_tipos_pago.push(
            {
                  IdItem: this.IdItemTipoPago,
                  IdTipoPago: 12,
                  TipoPago: 'Recargo Tarjeta',
                  SubTotal: monto_aumento
            });

            break;
        case 10:  // 6 pago
            var monto_aumento = +this.monto * (this.porcentaje_seis_pago / 100);  
            this.totalVenta = +this.totalVenta + +monto_aumento;
            this.totalTiposPago = this.totalTiposPago + +this.monto + monto_aumento;

            this.lineas_tipos_pago.push(
            {
                  IdItem: this.IdItemTipoPago,
                  IdTipoPago: 12,
                  TipoPago: 'Recargo Tarjeta',
                  SubTotal: monto_aumento
            });

            break;
        default:
            this.totalTiposPago = +this.totalTiposPago + +this.monto;
            break;
      }
      
      this.totalTiposPagoRestante = this.totalVenta - +this.totalTiposPago;

      this.IdItemTipoPago += 1;
    }

  }else{
    this.alertaService.alertFail('No puede agregar dos tipos de pago con tarjeta',false,3000);
  }

  this.monto = 0;

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
    
    this.itemPendiente = item;
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
    
    this.itemPendiente = item;
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
    // chequear que haya productos cargados y el total de venta sea mayor que cero
    if(this.lineas_venta.length <= 0)
    {
      this.alertaService.alertFail('Debe cargar productos/servicios a la venta',false,2000);
      return;
    }

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

    this.total_venta_inicial = this.totalVenta;
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
  eliminarItemTipoPago(IdItem: any){

    this.lineas_tipos_pago.forEach( (item, index) => {
      if(item.IdItem === IdItem) 
      {
        this.lineas_tipos_pago.splice(index,1);

        if(item.IdTipoPago != 11)
        {
          this.totalTiposPago -= +item.SubTotal;
        }else{
          this.totalTiposPago += +item.SubTotal;
        }
        
        this.totalVenta = this.total_venta_inicial;
        this.totalTiposPagoRestante = this.totalVenta - +this.totalTiposPago;

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
  aplicarDescuentoEfectivo()
  {
    this.cerrarModalDescuentoEfectivo();
    
    if(this.porcentajeDescuentoEfectivo > 0)
    {
      let monto_descuento = (this.porcentajeDescuentoEfectivo * this.montoEfectivo / 100);
      this.totalVenta -= monto_descuento;
      this.totalTiposPago = this.totalTiposPago - monto_descuento;

      this.lineas_tipos_pago.push(
      {
            IdItem: this.IdItemTipoPago,
            IdTipoPago: 11,
            TipoPago: 'Descuento Efectivo',
            SubTotal: monto_descuento
      });

    }
  }

  
  // ==============================
  // 
  // ================================
  cerrarModal(){
    let el: HTMLElement = this.divCerrarModal.nativeElement;
    el.click();
  }

  // ==============================
  // 
  // ================================
  abrirModalDescuentoEfectivo(){
    let el: HTMLElement = this.buttonAbrirModalDescuentoEfectivo.nativeElement;
    el.click();
  }

  // ==============================
  // 
  // ================================
  resetearVariables(){
    this.descuentoEfectivo = 0;
    this.activarModalDescuentoEfectivo = false;
    this.activarModal = false;
    this.lineas_tipos_pago = [];
    this.lineas_venta = [];
    this.cerrarModal();
    this.totalVenta = 0;
    this.totalTiposPago = 0;
    this.porcentajeDescuentoEfectivo = 0;
    this.montoEfectivo = 0;

  }

}

