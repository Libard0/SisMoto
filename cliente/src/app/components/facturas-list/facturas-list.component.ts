import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { PagosService } from 'src/app/services/pagos/pagos.service';
import { TiposervicioService } from 'src/app/services/tiposervicio/tiposervicio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturas-list',
  templateUrl: './facturas-list.component.html',
  styleUrls: ['./facturas-list.component.css'],
})
export class FacturasListComponent implements OnInit {
  /**DATOS NECESARIOS PARA MOSTRAR
   * FACTURAS, SU TIPO DE PAGO, SERVICIO
   * LOS USUARIOS
   * Y EL LOG USER PARA SABER SI ES UN CLIENTE
   */
  facturas: any = [];
  pagos: any = [];
  tiposervicio: any = [];
  usuarios: any = [];
  logUser: boolean = false;
  constructor(
    private facturasServices: FacturasService,
    private pagosService: PagosService,
    private tiposervicioService: TiposervicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //AL INICIAR DEBEMOS SABER SI EL USUARIO LOGGEADO ES ROL 3 = CLIENTE
    this.logUser = sessionStorage.getItem('userRole') == '3';
    //OBTENEMOS LAS FACTURAS, TIPOS DE PAGO Y SERVICIO
    this.getFacturas();
    this.getPagos();
    this.getTiposervicios();
  }

  escogerFacturas() {
    /**
     * SI EL USUARIO ES TIPO CLIENTE
     * Seleccionamos unicamente las facturas con su cedula
     */
    let ced = sessionStorage.getItem('userCed');
    this.facturas = this.facturas.filter((f: any) => f.cedula == ced);
  }
  /**Eliminar facturas que esten vacias porque son innecesarias */
  deleteEmpty() {
    for (let f of this.facturas) {
      if (
        f.cedula == 0 &&
        f.id_pago == 5 &&
        f.id_tiposervicio == 6 &&
        f.fecha == ''
      ) {
        this.deleteFactura(f.id);
      }
    }
  }
  /**OBTENER LAS FACTURAS
   * Utilizamos su servicio para trarlas de la base de datos
   */
  getFacturas() {
    this.facturasServices.getFacturas().subscribe(
      // si factura.id_pago == pagos.id_pagos => el nombre del pago
      (res) => {
        this.facturas = res;
        //eliminamos las que estén vacías
        this.deleteEmpty();
        //Si el usuario es un cliente, escogemos las que esten asociadas a él
        if (this.logUser) {
          this.escogerFacturas();
        }
      },
      (err) => console.error(err)
    );
  }
  //Eliminar la factura usando su id, a través de su servicio
  deleteFactura(id: string) {
    this.facturasServices.deleteFactura(id).subscribe(
      (res) => {
        this.getFacturas();
      },
      (err) => console.error(err)
    );
  }
  /**Método para obtener los medios de pago disponibles en la base de datos
   * usando el service de pagos
   */
  getPagos() {
    this.pagosService.getPagos().subscribe(
      (res) => {
        this.pagos = res;
      },
      (err) => console.error(err)
    );
  }
  /**Del mismo modo que con pagos, se traen los tipos de servicio de la bd */
  getTiposervicios() {
    this.tiposervicioService.getTiposervicios().subscribe(
      (res) => {
        this.tiposervicio = res;
      },
      (err) => console.error(err)
    );
  }
  //Mostrar el metodo de pago usado acorde a su id, por algun motivo no se
  //encuenta, se le deja sin especificar
  datapago(id_pago: string): string | undefined {
    let nombrepago = '';
    let pago = this.pagos.find((p: any) => p.id_pago == id_pago);
    nombrepago = pago ? pago.tipo_pago : 'Sin especificar';
    return nombrepago;
  }
  //Hacemos lo mismo con los servicios:
  dataServicio(id_tiposervicio: string): string | undefined {
    let service = this.tiposervicio.find(
      (ts: any) => ts.id_tiposervicio == id_tiposervicio
    );
    let nombreservicio = service ? service.nombre_tipo_servicio : '';

    return nombreservicio;
  }
  //Metodo para simplemente ir a agregar factura, apesar de su nombre
  goEdit() {
    this.router.navigate([`/facturas/add`]);
  }
}
