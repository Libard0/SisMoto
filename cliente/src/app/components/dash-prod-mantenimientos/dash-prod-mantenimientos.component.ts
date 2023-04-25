import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { DetallerepuestoService } from 'src/app/services/detallerepuesto/detallerepuesto.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
@Component({
  selector: 'app-dash-prod-mantenimientos',
  templateUrl: './dash-prod-mantenimientos.component.html',
  styleUrls: ['./dash-prod-mantenimientos.component.css'],
})
export class DashProdMantenimientosComponent implements OnInit {
  //CLASE PARA SABER PRODUCTOS MAS USADOS EN LOS MANTENIMIENTOS
  //Necesitamos los productos, detalles y un arreglo para los mas usados
  productos: any = [];
  productosMasUsado: any = [];
  detallesRepuesto: any = [];

  //GRAFICO:
  //Etiquetas del grafico
  public pieChartLabels: string[] = [];
  //Opciones
  public pieChartOptions: ChartOptions = {};
  //Tipo de grafico que queremos: ejem: line, pie, radar
  public pieChartType: ChartType = 'pie';
  //Legends
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  //Datos que vamos a cargar en las graficas
  public pieChartData: ChartDataset[] = [];
  public chartColors: any;

  constructor(
    //Traemos los servicios que necesitaremos
    private productosService: ProductosService,
    private detalleRepuestoService: DetallerepuestoService
  ) {}
  ngOnInit(): void {
    //Llenar el arreglo de productos nomás niciar
    this.getProductos();
  }

  setGraphic() {
    this.pieChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  }

  getProductos() {
    this.productosService.getProductos().subscribe(
      (res) => {
        //Trayendo los productos de la base de datos para llenar el arreglo
        //a través del servicio, una vez lleno, traemos  los detalles
        this.productos = res;
        this.getDetalles();
      },
      (err) => console.error(err)
    );
  }
  getDetalles() {
    this.detalleRepuestoService.getDetallerepuestos().subscribe(
      (res) => {
        /**Igual que con los productos, se trae a través del servicio y llenamos los
         * mas usados en los mantenimientos
         */
        this.detallesRepuesto = res;
        this.getProductosMasUsados();
      },
      (err) => console.error(err)
    );
  }
  getProductosMasUsados() {
    /**
     * Para cada producto gardaremos su id, nombre y cantidad
     * que es lo que vams a mostrar en el gráfico
     */
    let productInfo: {
      idProducto: number;
      nombre: string;
      cantidad: number;
    };
    /**
     * Recorremos los detalles
     * para cada uno llenamo la información del producto que necesitamos
     */
    for (let d of this.detallesRepuesto) {
      productInfo = {
        idProducto: d.idProducto,
        nombre: '',
        cantidad: d.cantidadP,
      };
      /**
       * Vamos a buscar si ya lo agregamos a los mas usados para saber si agregarlo o solo actualizar su cantidad
       */
      let index = 0;
      const obj = this.productosMasUsado.find(
        (p: { idProducto: number | any; cantidad: number }, inde: number) => {
          index = inde;
          return p.idProducto === productInfo.idProducto;
        }
      );
      /**
       * Si lo encontramos, solo actualizamos su cantidad
       * Si no lo agregamos
       */
      if (obj) {
        this.productosMasUsado[index].cantidad += 1;
      } else {
        let p = this.productos.find((p: any) => p.id == productInfo.idProducto);

        productInfo.nombre = p.marca + p.referencia;
        this.productosMasUsado.push(productInfo);
      }
    } //--end for
    /**
     * Organizamos de maor a menosr de acuerdo a la cantidad
     * y dejamos solo 5
     */
    this.productosMasUsado.sort((a: any, b: any) => {
      return b.cantidad - a.cantidad;
    });
    this.productosMasUsado.splice(5);
    // this.productosMasUsado = this.productosMasUsado.filter(
    //   (el: any, index: number) => {
    //     if (index < 5) {
    //       return el;
    //     }
    //   }
    // );
    //Finalmente confuramos el grafico con los datto
    this.setGraphicData(this.productosMasUsado);
  }

  setGraphicData(array: any[]) {
    /**
     * Gracias a la estructura de los elementos del array traido ({id, nombre, cantidad})
     * escogemos solo los nombres para las etiquetas y las cantidades para los datos con map
     */
    this.pieChartLabels = array.map((el: any) => el.nombre);
    let datos = array.map((el: any) => el.cantidad);
    //Escogemos los colores del gráfico
    let colores = ['#E91E63', '#2196F3', '#F44336', '#FFEB3B', '#4CAF50'];
    this.chartColors = [];
    //Agregamos los datos al gráfico
    this.pieChartData.push({
      data: datos,
      label: 'Productos mas usados en mantenimientos',
      backgroundColor: colores,
    });
  }
}
