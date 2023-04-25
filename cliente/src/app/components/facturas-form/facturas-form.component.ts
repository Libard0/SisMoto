import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleFactura, Factura } from 'src/app/models/facturas';
import { Producto } from 'src/app/models/productos';

import { DetalleFacturaService } from 'src/app/services/detallefactura/detallefactura.service';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { PagosService } from 'src/app/services/pagos/pagos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { TiposervicioService } from 'src/app/services/tiposervicio/tiposervicio.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-facturas-form',
  templateUrl: './facturas-form.component.html',
  styleUrls: ['./facturas-form.component.css'],
})
export class FacturasFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  /**IUnterface de la factura */
  factura: Factura = {
    id: 0,
    codigo: '',
    cedula: 0,
    descripcion: '',
    total: 0,
    id_pago: 5,
    id_tiposervicio: 6,
    fecha: '',
  };
  /**Interface del producto */
  producto: Producto = {
    id: 0,
    marca: '',
    referencia: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    talla: '',
    imagen: '',
    fecha: '',
    id_categoria: 0,
  };
  //Traer todas las facturas para calcular el id de la actual
  facturas: any = [];

  /**Interface de los detalles a guardar */
  detallefactura: DetalleFactura = {
    id_dtfact: 0,
    id_produc: 0,
    cant_produc: 0,
    factura_id: 0,
    valor: 0,
    fecha: '',
  };
  /**Todos los datos a usar
   * detalles de facturas, pagos, servicios
   * usuarios
   * productos, saber si se esta editando
   * y un arreglo para permitir que las facturas almacenen  mas de un producto
   */
  detalles: any = [];
  pagos: any = [];
  tipoServicios: any = [];
  usuarios: any = [];
  productos: any = [];
  edit: boolean = false;
  productosAgregados: any = [];

  idFact: number | undefined;
  idProducto: number;
  cantidad: number | null;

  // idF: number = 0;
  constructor(
    private facturasService: FacturasService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private pagosService: PagosService,
    private tiposervicioService: TiposervicioService,
    private usuariosService: UsuariosService,
    private detallefacturaService: DetalleFacturaService,
    private productosService: ProductosService
  ) {
    /**datos para el apartado de agregar productos */
    this.idProducto = 0;
    this.cantidad = null;
    this.idFact = 0;
  }

  ngOnInit(): void {
    /**OBTENER DATOS DE PAGOS, SERVICIOS Y USUARIOS A TRAVÉS DE LOS SERVICES
     * DE CADA UNO
     */
    //USUARIOS
    this.getUsuarios();
    //PRODUCTOS
    this.productosService.getProductos().subscribe(
      (res) => {
        this.productos = res;
      },
      (err) => console.error(err)
    );
    this.pagosService.getPagos().subscribe(
      (data) => {
        this.pagos = data;
      },
      (err) => console.error(err)
    );
    //SERVICIOS
    this.tiposervicioService.getTiposervicios().subscribe(
      (data) => {
        this.tipoServicios = data;
      },
      (err) => console.error(err)
    );

    const params = this.activedRoute.snapshot.params;

    //Si se recibe un parametro por url se va a editar
    if (params['id']) {
      this.idFact = params['id']; //Es lo de la url, el id de la factura a editar y del detalle
      this.edit = true;
      this.getDetalles(); //obtenemos los detalles
      this.facturasService.getFactura(params['id']).subscribe(
        (res) => {
          this.factura = res;
          this.detallefactura.factura_id = params['id'];
        },
        (err) => console.error(err)
      );
    } else {
      /**si no se trae algo por url es que vamos a crear la factuar
       * entonces buscamos todas las facturas y a partir de ahi calcular el id
       */
      this.facturasService.getFacturas().subscribe(
        (res) => {
          this.facturas = res;
          if (this.facturas.length >= 1) {
            let index = this.facturas.length - 1;
            this.factura.id = this.facturas[index].id + 1;
          } else {
            //Si no hay facturas guardadas, se empieza por la factura 100000
            this.factura.id = 100000;
          }
          //le damos el id de la factura al detalle y lo guuardamos ne la variable
          //global idFact para usarl en los detalles
          this.idFact = this.factura.id;
          this.detallefactura.factura_id = this.factura.id;
        },
        (err) => console.error(err)
      );
    }
  }

  /**Obtener los usuarios de la base de datos y filtrar por clientes */
  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        //Necesitamos solo los clientes, entonces filtramos los usuarios segun su rol
        //3 para clientes
        this.usuarios = this.usuarios.filter((u: any) => u.idtipousuario == 3);
      },
      (err) => console.error(err)
    );
  }
  //Obtenmos todas las facturas de la base de datos para usarlas al c
  //calcular la el id de la presente factura en creación
  getFacturas() {
    this.facturasService.getFacturas().subscribe(
      // si factura.id_pago == pagos.id_pagos => el nombre del pago
      (res) => {
        this.facturas = res;
      },
      (err) => console.error(err)
    );
  }
  /**GUARDAR UNA FACTURA */
  saveNewFactura() {
    /**Si no se han agregado productos lanza una laerta, no se pueden crear
     * facturas vacias
     */
    if (this.productosAgregados.length > 0) {
      this.facturasService.saveFactura(this.factura).subscribe(
        (res) => {
          //Si no se ha dado una fecha, no deja guardar detalles
          if (this.factura.fecha != '') {
            //De lo contrario, guardamos los detalles y nos devolvemos a la lista
            //general
            this.saveDetalles();
            this.router.navigate(['/facturas']);
          }
        },
        (err) => console.error(err)
      );
    } else {
      window.alert('debe agregar almenos un producto');
    }
  }
  /**ACTUALIZAR FACTURAS POR MEDIO DE SU SERVICIO */
  updateFactura() {
    this.facturasService
      .updatedFactura({ id: this.factura.id, updatedFactura: this.factura })
      .subscribe(
        (res) => {
          //Al igual que al guardar, guardamos detalles y volvemos a facturas
          this.saveDetalles();
          this.router.navigate(['/facturas']);
        },
        (err) => console.error(err)
      );
  }
  /**OBTENER LOS DETALLES DE LA BASE DE DATOS */
  getDetalles() {
    this.detallefacturaService.getDetalleFacturas().subscribe(
      (data) => {
        this.detalles = data;
        this.setProds();
      },
      (err) => console.error(err)
    );
  }
  //GUARDAR DETALLES EN LA BASE DE DATOS USANDO SU SERVICIO
  saveDetalle(detalle: DetalleFactura) {
    delete detalle.id_dtfact;
    this.detallefacturaService.saveDetalleFactura(detalle).subscribe(
      () => {},
      (err) => console.error(err)
    );
  }
  /**GUARDAR LOS PRODUCTOS AGREGADOS CADA UNO EN UN DETALLE */
  saveDetalles() {
    /**Recorremos los productos agregados
     * y para cada uno creamos y guardamos un detalle
     */
    for (let p of this.productosAgregados) {
      const detalle: DetalleFactura = {
        id_dtfact: 0,
        id_produc: p.id,
        cant_produc: p.cantidadComprar,
        factura_id: this.idFact,
        valor: 0,
        fecha: this.factura.fecha,
      };
      //Llamar al metodo de guardar detalles para guardar cada uno en la BD
      this.saveDetalle(detalle);
    }
  }
  /**MÉTOSO PARA AGREGAR PRODUCTOS A LA FACTUARA Y A SU VEZ MOSTRARLOS  */
  agregarProducto(idP?: number) {
    /**Delaramos un id y un objeto produto */
    let product: any = {};
    let idBuscar: number = 0;
    //si no se le pasa po parámetro, lo tomamos del idProducto que se guarda desde el form
    if (idP) {
      idBuscar = idP;
    } else {
      idBuscar = this.idProducto;
    }
    //buscamos el producto con el id que traemos
    product = this.productos.find((p: any) => p.id == idBuscar);
    // al product, le agregamos la propiedad de catidad a comprar, que tambuién traemos del front
    const producto = { ...product, cantidadComprar: this.cantidad };

    //Agregamos el producto al arreglo de productos agregados para llevar su nombre y cantidad
    this.productosAgregados.push(producto);
    //Set las variables a 0 de nuevo
    this.idProducto = 0;
    this.cantidad = 0;
  }
  //Calculamos el precio que se le muestra al cliente
  //calculamos el precio de cada producto por su cantidad
  calcularPrecio(): number {
    let price = this.productosAgregados.reduce((acc: any, curr: any) => {
      return (acc += curr.precio * curr.cantidadComprar);
    }, 0);
    return price;
  }

  //Metodo eliminar
  delete(product: Producto) {
    //Vamos a eliminar de 2 sitios, de los detalles y de los mostrados en pantalla
    let detElim = this.detalles.find((df: any) => df.id_produc == product.id);

    let index = this.productosAgregados.findIndex(
      (el: any) => el.id == product.id
    );
    //los eliminamos del productos agregados
    this.productosAgregados.splice(index, 1);
    //Eliminar también su detalle
    this.deleteDetalle(detElim.id_dtfact);
  }
  //Con este método eliminamos el detalle de la base de datos
  deleteDetalle(id: string) {
    this.detallefacturaService.deleteDetalleFactura(id).subscribe(
      () => {},
      (err) => console.error(err)
    );
  }
  //Poner los productos en la patalla
  setProds() {
    this.detalles = this.detalles.filter((el: any) => {
      return el.factura_id == this.idFact;
    });
    for (let detalle of this.detalles) {
      this.idProducto = detalle.id_produc;
      this.cantidad = detalle.cant_produc;
      this.agregarProducto(detalle.id_produc);
    }
  }
}
