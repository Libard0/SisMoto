import { Factura, DetalleFactura } from 'src/app/models/facturas';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { DetalleFacturaService } from 'src/app/services/detallefactura/detallefactura.service';

let detallefacturaService: DetalleFacturaService;
export function saveDetalleFN(detalle: DetalleFactura) {
    delete detalle.id_dtfact;
    console.log(detalle);
    detallefacturaService.saveDetalleFactura(detalle)
      .subscribe(
        res => {
          console.log(res);
          //this.router.navigate(['/facturas']);
        },
        err => console.error(err)
      )
  }