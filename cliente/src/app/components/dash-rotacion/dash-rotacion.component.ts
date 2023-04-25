import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { DetalleFacturaService } from 'src/app/services/detallefactura/detallefactura.service';
import { DetallerepuestoService } from 'src/app/services/detallerepuesto/detallerepuesto.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-dash-rotacion',
  templateUrl: './dash-rotacion.component.html',
  styleUrls: ['./dash-rotacion.component.css'],
})
export class DashRotacionComponent implements OnInit {
  productos: any = [];
  detallesFacturas: any = [];
  detallesRepuestos: any = [];
  rotaciones: any = [];
  time: string = 'mes';
  masMenos: string = 'mas';

  //GRAFICO:
  //Etiquetas del grafico
  public bChartLabels: string[] = [];
  //Opciones
  public bChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    indexAxis: 'y',
  };
  //Tipo de grafico que queremos: ejem: line, b, radar
  public bChartType: ChartType = 'bar';
  //Legends
  public bChartLegend = true;
  public bChartPlugins = [pluginDataLabels];
  //Datos que vamos a cargar en las graficas
  public bChartData: ChartDataset[] = [];
  // colores = ["#186A3B", "#239B56", "#28B463", "#2ECC71", "#58D68D"];
  colores = ['#641E16', '#922B21', '#C0392B', '#E74C3C', '#F1948A'];

  constructor(
    private productosService: ProductosService,
    private detalleFacturaService: DetalleFacturaService,
    private detalleRepuestoService: DetallerepuestoService
  ) {}
  ngOnInit(): void {
    this.getProductos();
  }
  getProductos() {
    this.productosService.getProductos().subscribe(
      (res) => {
        this.productos = res;
        this.getDetallesFacturas();
      },
      (err) => console.error(err)
    );
  }
  getDetallesFacturas() {
    this.detalleFacturaService.getDetalleFacturas().subscribe(
      (res) => {
        this.detallesFacturas = res;
        this.llenarRotacion(
          this.detallesFacturas,
          'id_produc',
          'cant_produc',
          'fecha'
        );
        this.getDetallesRepuestos();
      },
      (err) => console.error(err)
    );
  }
  getDetallesRepuestos() {
    this.detalleRepuestoService.getDetallerepuestos().subscribe(
      (res) => {
        this.detallesRepuestos = res;
        this.llenarRotacion(
          this.detallesRepuestos,
          'idProducto',
          'cantidadP',
          'fecha'
        );
        this.ordenarDatos();
      },
      (err) => console.error(err)
    );
  }

  llenarRotacion(
    array: any[],
    idPATR: string,
    cantATR: string,
    fechaATR: string
  ) {
    for (let i = 0; i < array.length; i++) {
      let id = array[i][idPATR];
      let cantidad = array[i][cantATR];
      let fecha = array[i][fechaATR];
      this.rotaciones.push({
        idProducto: id,
        cantidadProducto: cantidad,
        fechaMovimiento: fecha,
      });
    }
  }
  ordenarDatos() {
    //ahora a partir del valor de tiempo, escogemos solo semestre, mes o año:
    //get Fecha para obtener la fecha para el rango que deseamos, hace 1, 6 o 12 meses
    let rangoFecha = this.getFecha();
    //entonces escogemos las fechas que esten dentro del rango
    this.rotaciones = this.rotaciones.filter((det: any) => {
      const fecha = new Date(det.fechaMovimiento);
      return fecha >= rangoFecha;
    });

    //con el map podremos guardar cada producto y cantidad de rotaciones
    const productosRotados = new Map<number, number>();
    //agregamos todos los productos al map
    this.productos.forEach((producto: any) => {
      const idProducto = producto.id;
      const cantidadProducto = 0;
      productosRotados.set(idProducto, cantidadProducto);
    });
    //ahora, se agrega cada unopor cantidad rotada
    this.rotaciones.forEach((rotacion: any) => {
      const { idProducto, cantidadProducto } = rotacion;
      const cantidadActual = productosRotados.get(idProducto) ?? 0;
      productosRotados.set(idProducto, cantidadActual + cantidadProducto);
    });

    //luego guardamos lo del map en un array, lo ordenamos
    const productosRotadosOrdenados = Array.from(productosRotados).sort(
      (a, b) => b[1] - a[1]
    );

    //Para saber los menos rotados, solo con el valor de manMenos y un reverse
    if (this.masMenos == 'menos') {
      productosRotadosOrdenados.reverse();
    }

    //ordenamos el grafico con los datos de los primeros 5, los mas rotados
    this.setGraph(
      productosRotadosOrdenados.filter((el: any, i: number) => i < 5)
    );
  }

  getFecha(): Date {
    let fechaActual = new Date();

    if (this.time == 'mes') {
      // Fecha de hace 1 mes
      let fechaHace1Mes = new Date(fechaActual);
      if (fechaActual.getMonth() === 0) {
        // Si la fecha actual está en enero, restar 1 año y sumar 11 meses
        fechaHace1Mes.setFullYear(fechaActual.getFullYear() - 1);
        fechaHace1Mes.setMonth(11);
      } else {
        // Restar 1 mes normalmente
        fechaHace1Mes.setMonth(fechaActual.getMonth() - 1);
      }
      return fechaHace1Mes;
    } else if (this.time == 'sem') {
      // Fecha de hace 6 meses
      const fechaHace6Meses = new Date(fechaActual);
      fechaHace6Meses.setMonth(fechaActual.getMonth() - 6);
      return fechaHace6Meses;
    } else {
      const fechaHace1 = new Date(fechaActual);
      fechaHace1.setFullYear(fechaActual.getFullYear() - 1);
      return fechaHace1;
    }
  }

  setGraph(array: any) {
    //inicializamos todo en vacio
    this.bChartData = [];
    this.bChartLabels = [];

    //Recibimos [id Producto, cantidad], entonces los datos van a ser cantidad
    let datos = array.map((el: any) => el[1]);
    //luego necesitamos el nombre de c/u para el label
    //por lo que se obtendra un objeto de tipo {id:id, name: name}
    //con los datos del producto
    let productIdName = this.productos.map((p: any) => {
      let id = p.id;
      let name = p.marca + ' ' + p.referencia;
      return { id, name };
    });
    //luego, buscamos en esos objetos con el id que viene del array
    //y lo guardamos en labels
    this.bChartLabels = array.map((el: [number, number]) => {
      let [idP] = el;
      let pr = productIdName.find((p: any) => p.id == idP);
      return pr.name;
    });
    //agregamos los datos al grafico
    this.bChartData.push({
      data: datos,
      label: 'Rotacion de productos por temporada',
      backgroundColor: this.colores,
    });
  }
}
