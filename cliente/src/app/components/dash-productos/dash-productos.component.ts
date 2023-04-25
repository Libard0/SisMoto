import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
//import { MantenimientosService } from 'src/app/services/mantenimientos/mantenimientos.service';
import { DetalleFacturaService } from 'src/app/services/detallefactura/detallefactura.service';
//import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
//import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
// import { Producto } from 'src/app/models/productos';

@Component({
  selector: 'app-dash-productos',
  templateUrl: './dash-productos.component.html',
  styleUrls: ['./dash-productos.component.css'],
})
export class DashProductosComponent implements OnInit {
  productosMasVend: any = [];
  detallesfacturas: any = [];
  productos: any = [];

  //DEL GRAFICO
  public barChartLabels: string[] = [];

  ngOnInit(): void {
    this.getProductos();
  }

  constructor(
    private productosService: ProductosService,
    private detallefacturaService: DetalleFacturaService
  ) {}

  getProductos() {
    this.productosService.getProductos().subscribe(
      (res) => {
        this.productos = res;
        this.getDetalles();
      },
      (err) => console.error(err)
    );
  }

  getDetalles() {
    this.detallefacturaService.getDetalleFacturas().subscribe(
      (res) => {
        this.detallesfacturas = res;
        this.getProductosMasVen();
      },
      (err) => console.error(err)
    );
  }

  getProductosMasVen() {
    let productInfo: {
      idProducto: number;
      nombre: string;
      // nVentas: number,
      cantidad: number;
    };

    for (let d of this.detallesfacturas) {
      productInfo = {
        idProducto: d.id_produc,
        nombre: '',
        cantidad: d.cant_produc,
      };

      let index = 0;
      const obj = this.productosMasVend.find(
        (p: { idProducto: number | any; cantidad: number }, inde: number) => {
          index = inde;
          return p.idProducto === productInfo.idProducto;
        }
      );
      if (obj) {
        this.productosMasVend[index].cantidad += 1;
      } else {
        let p = this.productos.find((p: any) => p.id == productInfo.idProducto);

        productInfo.nombre = p.marca + p.referencia;
        this.productosMasVend.push(productInfo);
      }
    }

    this.productosMasVend.sort((a: any, b: any) => {
      return b.cantidad - a.cantidad;
    });
    this.productosMasVend = this.productosMasVend.filter(
      (el: any, index: number) => {
        if (index < 5) {
          return el;
        }
      }
    );
    this.configureGraph(this.productosMasVend);
  }

  //CONFIGURAR EL GRAFICO
  // OPCIONES DEL GRAFICO
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  //Tipo de grafico que queremos: ejem: line, bar, radar
  // public barChartType: ChartType = 'bar';
  public barChartType: ChartType = 'doughnut' as ChartType;
  // public barChartType: ChartType = "bar" as ChartType;;
  //Legends
  public barChartLegend = true;

  public barChartPlugins = [pluginDataLabels];
  //Datos que vamos a cargar en las graficas
  public barChartData: ChartDataset[] = [];
  public chartColors: any;
  //ETIQUETAS
  configureGraph(array: any[]) {
    this.barChartLabels = array.map((el: any) => el.nombre);
    let datosMasVendidos = array.map((el: any) => el.cantidad);
    let datos = [...datosMasVendidos];
    let colores = ['#FF9800', '#03A9F4', '#795548', '#FFEB3B', '#9C27B0'];
    this.chartColors = [];

    this.barChartData.push({
      data: datos,
      label: 'Productos mas vendidos',
      backgroundColor: colores,
    });
    //this.chartColors.push({ backgroundColor: colores });
  }
}
