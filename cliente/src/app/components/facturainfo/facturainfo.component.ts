import { Component } from '@angular/core';
import { Factura } from 'src/app/models/facturas';
import { Usuario } from 'src/app/models/usuarios';
import { DetalleFacturaService } from 'src/app/services/detallefactura/detallefactura.service';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { PagosService } from 'src/app/services/pagos/pagos.service';
import { TiposervicioService } from 'src/app/services/tiposervicio/tiposervicio.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Producto } from 'src/app/models/productos';

@Component({
  selector: 'app-facturainfo',
  templateUrl: './facturainfo.component.html',
  styleUrls: ['./facturainfo.component.css'],
})
export class FacturainfoComponent {
  /**Interface del usuario */
  usuario: Usuario = {
    id: 0,
    cedula: 0,
    nombre: 'Desconocido',
    apellido: '',
    celular: 0,
    correo: '',
    contrasena: '',
    // created_at: new Date(),
    idtipousuario: 0,
  };
  /**Interface de la factura */
  factura: Factura = {
    id: 0,
    codigo: '',
    cedula: 0,
    descripcion: '',
    total: 0,
    id_pago: 0,
    id_tiposervicio: 0,
    fecha: '',
  };
  /**datos necesarios
   * usuarios para el nombre de los clientes
   * detalles para traer los productos
   * pagos y tipos de servicio para la informacion
   * los productos
   */
  usuarios: any = [];
  detallesfacturas: any = [];
  pagos: any = [];
  tiposervicio: any = [];
  productos: any = [];

  constructor(
    private facturasServices: FacturasService,
    private pagosService: PagosService,
    private tiposervicioService: TiposervicioService,
    private usuariosService: UsuariosService,
    private detallefacturaService: DetalleFacturaService,
    private productosService: ProductosService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /**Obtener los datos para llenar todos los arreglos usando los
     * servicios de cada uno
     */
    this.getFactura();
  }
  /**Obtener f<acturas */
  getFactura() {
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.facturasServices.getFactura(params['id']).subscribe(
        // si factura.id_pago == pagos.id_pagos => el nombre del pago
        (res) => {
          this.factura = res;
          this.getUsuarios();
          this.getDetalles();
          this.getTiposervicios();
          this.getPagos();
        },
        (err) => console.error(err)
      );
    }
  }
  /**Obtener usuarios */
  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (res) => {
        this.usuarios = res;
        let u = this.usuarios.find(
          (el: any) => el.cedula == this.factura.cedula
        );
        if (u) {
          this.usuario = u;
        }
      },
      (err) => console.error(err)
    );
  }
  /**Método para obtener los detalles de facturas */
  getDetalles() {
    this.detallefacturaService.getDetalleFacturas().subscribe(
      (res) => {
        this.detallesfacturas = res;
        /**Escoger solo los detalles asociados a la factura */
        this.detallesfacturas = this.detallesfacturas.filter(
          (el: any) => this.factura.id == el.factura_id
        );
        /**Traer los productos contenidos en el detalle */
        this.getProductos();
      },
      (err) => console.error(err)
    );
  }
  /**Obtener los detalles de los tipos de pago */
  getPagos() {
    this.pagosService.getPagos().subscribe(
      (res) => {
        this.pagos = res;
      },
      (err) => console.error(err)
    );
  }
  //Obtenemos el tipo de pago que se uso en la factura
  getPago(): string {
    for (let p of this.pagos) {
      if (this.factura.id_pago === p.id_pago) {
        return p.tipo_pago;
      }
    }
    return '';
  }
  //Traer el tipo de servicio usado en la factura
  getTiposervicios() {
    this.tiposervicioService.getTiposervicios().subscribe(
      (res) => {
        this.tiposervicio = res;
      },
      (err) => console.error(err)
    );
  }
  //Obtener los productos que estan en los detalles
  getProductos() {
    for (let d of this.detallesfacturas) {
      //para cada producto, se obtiene de la base de datos
      this.getProducto(d.id_produc);
    }
  }
  getProducto(id: number) {
    /**Obtener los productos,
     * creamos su modelo
     * traemos los datos usando su servicio y lo agregamos al arreglo de productos
     */
    let producto: Producto = {
      id: 0,
      marca: '',
      referencia: '',
      descripcion: '',
      precio: 0,
      cantidad: 0,
      talla: '',
      imagen: '',
      // fecha?: string;
      id_categoria: 0,
    };
    this.productosService.getProducto(id + '').subscribe(
      (res) => {
        producto = res;
        this.productos.push(producto);
      },
      (err) => console.error(err)
    );
  }
  /**Obtener la cantidad de productos */
  getCantidad(id: number): number {
    let detail = this.detallesfacturas.filter((el: any) => el.id_produc == id);
    return detail.cant_produc ?? 1;
  }
  //En caso de haber sido un mantenimiento, se calcula el valor de la mano de obra
  getPriceWNMO(): number {
    let tot = 0;
    tot = this.detallesfacturas.reduce((acc: any, curr: any) => {
      return (acc += curr.valor);
    }, 0);
    let fTotal: number = this.factura.total ?? 0;
    return fTotal - tot;
  }
}
