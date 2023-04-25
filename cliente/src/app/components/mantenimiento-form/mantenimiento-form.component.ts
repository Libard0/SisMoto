import { Component, HostBinding, OnInit } from '@angular/core';
import { Mantenimiento } from 'src/app/models/mantenimiento';
import { MantenimientosService } from 'src/app/services/mantenimientos/mantenimientos.service';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

import { ProductosService } from 'src/app/services/productos/productos.service';
import { DetallerepuestoService } from 'src/app/services/detallerepuesto/detallerepuesto.service';
import { DetalleRepuesto } from 'src/app/models/productos';

import { Factura, DetalleFactura } from 'src/app/models/facturas';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { DetalleFacturaService } from 'src/app/services/detallefactura/detallefactura.service';

@Component({
  selector: 'app-mantenimiento-form',
  templateUrl: './mantenimiento-form.component.html',
  styleUrls: ['./mantenimiento-form.component.css'],
})
export class MantenimientoFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  mantenimiento: Mantenimiento = {
    id_mantenimiento: 0,
    placa: '',
    fecha_mantenimiento: '', //new Date()
    seguimiento: '',
    descripcion: '',
    horas_empleadas: 0,
    repuestos: '',
    manoobra: 0,
    idCliente: 0,
    estadoMantenimiento: '',
  };

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

  facturas: any = [];
  usuarios: any = [];
  productosAgregados: any = [];
  edit: boolean = false;
  productos: any = [];
  idFact: number;
  idProducto: number;
  cantidad: number | null;
  detalles: any = [];
  detallesFacturas: any = [];
  allDetalles: any = [];
  mantenimientos: any = [];

  seguimientoACT: string | undefined = '';

  //encontrar la forma de guardar los detalles repuesto sin tanta vaina

  constructor(
    private mantenimientosService: MantenimientosService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private productosService: ProductosService,
    private detallerepuestoService: DetallerepuestoService,
    private facturasService: FacturasService,
    private detallefacturasService: DetalleFacturaService
  ) {
    this.idProducto = 0;
    this.cantidad = null;
    this.idFact = 0;
  }

  ngOnInit(): void {
    this.getFacturas();
    this.productosService.getProductos().subscribe(
      (res) => {
        this.productos = res;
      },
      (err) => console.error(err)
    );
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.getDetalles(params['id']);
      this.mantenimientosService.getMantenimiento(params['id']).subscribe(
        (res) => {
          this.mantenimiento = res;
          this.edit = true;

          this.seguimientoACT = this.mantenimiento.seguimiento;
          this.mantenimiento.seguimiento = '';
        },
        (err) => console.error(err)
      );
    } else {
      this.mantenimientosService.getMantenimientos().subscribe((res) => {
        this.mantenimientos = res;

        if (this.mantenimientos.length >= 1) {
          let index = this.mantenimientos.length - 1;

          this.mantenimiento.id_mantenimiento =
            this.mantenimientos[index].id_mantenimiento + 1;
        } else {
          this.mantenimiento.id_mantenimiento = 1;
        }
      });
    }

    this.usuariosService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        this.usuarios = this.usuarios.filter((u: any) => u.idtipousuario == 3);
      },
      (err) => console.error(err)
    );
  }

  getDetalles(id: number) {
    this.detallerepuestoService.getDetallerepuestos().subscribe((data) => {
      this.allDetalles = data;
      this.allDetalles = this.allDetalles.filter(
        (d: any) => d.idMantenimiento == id
      );
      this.showProds();
    });
  }
  showProds() {
    for (let d of this.allDetalles) {
      const product = this.productos.find((p: any) => p.id == d.idProducto);
      const producto = {
        ...product,
        cantidadComprar: d.cantidadP,
        idDetalle: d.idDetalleRep,
      };
      this.productosAgregados.push(producto);
    }
  }
  saveNewMantenimiento() {
    // delete this.mantenimiento.id_mantenimiento;
    this.mantenimiento.seguimiento = "["+
    this.setfecha()+"] = " +
    this.mantenimiento.seguimiento;

    this.mantenimientosService.saveMantenimiento(this.mantenimiento).subscribe(
      (res) => {
        this.saveDetalles();
        this.router.navigate(['/mantenimientos']);
      },
      (err) => console.error(err)
    );
  }
  saveDetalles() {
    for (let d of this.detalles) {
      delete d.idDetalleRep;
      d.fecha = this.mantenimiento.fecha_mantenimiento;
      this.detallerepuestoService.saveDetallerepuesto(d).subscribe((res) => {});
    }
  }
  updateMantenimiento() {
    if (this.mantenimiento.estadoMantenimiento == 'Finalizado') {
      this.mantenimiento.estadoMantenimiento = 'Finalizado Facturado';
      this.facturar();
    }
    this.mantenimiento.seguimiento = "["+
    this.setfecha()+"] = " +
    this.mantenimiento.seguimiento + '\n'
    ;
    this.mantenimiento.seguimiento =this.mantenimiento.seguimiento
       + '\n' + this.seguimientoACT;
    this.mantenimientosService
      .updatedMantenimiento({
        id: this.mantenimiento.id_mantenimiento,
        updatedMantenimiento: this.mantenimiento,
      })
      .subscribe(
        (res) => {
          this.saveDetalles();

          this.router.navigate(['/mantenimientos']);
        },
        (err) => console.error(err)
      );
  }
  agregarProducto() {
    const product = this.productos.find((p: any) => p.id == this.idProducto);
    const producto = { ...product, cantidadComprar: this.cantidad };

    const detail: DetalleRepuesto = {
      idDetalleRep: 0,
      idMantenimiento: this.mantenimiento.id_mantenimiento,
      idProducto: producto.id,
      cantidadP: producto.cantidadComprar,
    };

    this.detalles.push(detail);
    /*{
      nombre: this.idProducto,
      precio: this.precio
    };*/

    this.productosAgregados.push(producto);

    this.idProducto = 0;
    // this.precio = null;
  }
  delete(product: any) {
    let index = this.productosAgregados.findIndex(
      (el: any) => el.id == product.id
    );
    this.productosAgregados.splice(index, 1);

    this.detallerepuestoService
      .deleteDetallerepuesto(product.idDetalle + '')
      .subscribe((res) => {});
  }
  calcularPrecio(): string {
    let total = 0;
    for (let pA of this.productosAgregados) {
      total += pA.precio * pA.cantidadComprar;
    }

    return '$' + total;
  }
  getFacturas() {
    this.facturasService.getFacturas().subscribe(
      // si factura.id_pago == pagos.id_pagos => el nombre del pago
      (res) => {
        this.facturas = res;
      },
      (err) => console.error(err)
    );
  }

  //FACTURAR THIS JODA
  facturar() {
    //obtener el id de la factura a ingresar
    let id = this.facturas[this.facturas.length - 1].id + 1;
    //Para guardar el usuario en la factura, necesitamos el cc, pero al usar la id, tocará:
    let userCC = this.usuarios.filter(
      (us: any) => us.id == this.mantenimiento.idCliente
    )[0].cedula;

    //Calcular el total
    let totalF = this.calcularTotalF();

    //Obtener la fecha de hoy mm - dd - YYYY
    let fechaHoy = this.setfecha();

    this.factura = {
      id: id,
      codigo: 'FACT' + id,
      cedula: userCC,
      descripcion: 'Mantenimiento: ' + this.mantenimiento.descripcion,
      total: totalF,
      id_pago: 5,
      id_tiposervicio: 8,
      fecha: fechaHoy,
    };
    this.saveFactura(this.factura);
  }

  ordenarDetalles(id?: number) {
    for (let pA of this.productosAgregados) {
      let detalleF: DetalleFactura = {
        id_dtfact: 0,
        id_produc: pA.id,
        cant_produc: pA.cantidadComprar,
        factura_id: this.factura.id,
        valor: pA.cantidadComprar * pA.precio,
        fecha: this.factura.fecha,
      };
      this.detallesFacturas.push(detalleF);
    }

    this.detallesFacturas.forEach((df: DetalleFactura) => this.saveDetalle(df));
  }
  saveDetalle(detalle: DetalleFactura) {
    delete detalle.id_dtfact;
    this.detallefacturasService.saveDetalleFactura(detalle).subscribe(
      (res) => {
        // this.router.navigate(['/facturas']);
        // this.router.navigate(['/mantenimientos']);
      },
      (err) => console.error(err)
    );
  }

  saveFactura(factura: Factura) {
    this.facturasService.saveFactura(factura).subscribe(
      (res) => {
        if (this.productosAgregados.length > 0) {
          this.ordenarDetalles();
        }
      },
      (err) => console.error(err)
    );
  }

  calcularTotalF(): number {
    //empezamos el valor en 0
    let total = 0;
    //ahora recorremos los objetos agregados y multiplicamos la cantidad por su precio
    //y lo agregamos al total

    // for (let pA of this.productosAgregados) {
    //   total += pA.cantidadComprar * pA.precio;
    // }
    //finalmente le sumamos el valor de la mano de obra
    //operador coalescente nulo, para saber mas, consulte documentacion
    let mObra: number = this.mantenimiento.manoobra ?? 0;
    total = total + mObra;
    return total;
  }

  setfecha(): string {
    let day = parseInt(new Date().getDate().toString());
    let month = parseInt(new Date().getMonth().toString());
    let year = new Date().getFullYear().toString();
    let dayF = day < 10 ? '0' + day : day;
    let monthF = month < 10 ? '0' + month : month;
    return year + '-' + monthF + '-' + dayF;
  }
}
