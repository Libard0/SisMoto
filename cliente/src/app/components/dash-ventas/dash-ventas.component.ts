import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { MantenimientosService } from 'src/app/services/mantenimientos/mantenimientos.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation'

@Component({
  selector: 'app-dash-ventas',
  templateUrl: './dash-ventas.component.html',
  styleUrls: ['./dash-ventas.component.css']
})
export class DashVentasComponent implements OnInit {


  //GRAFICO:
  //Etiquetas del grafico
  public bChartLabels: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  //Opciones
  public bChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      y: {
        beginAtZero: true
      }
    },

  };;
  //Tipo de grafico que queremos: ejem: line, b, radar
  public bChartType: ChartType = "line";
  //Legends
  public bChartLegend = true;
  public bChartPlugins = [pluginDataLabels];
  //Datos que vamos a cargar en las graficas 
  public bChartData: ChartDataset[] = [];
  // colores = ["#2C3E50", "#34495E", "#7F8C8D", "#BDC3C7", "#ECF0F1"];
  colores = ["#000"];


  mantenimientos: any = [];
  facturas: any = [];
  tipo: string = "Ventas";
  value: string = "hoy";
  thisA: string = "";
  frase: string = "Espere...";
  fecha: Date = new Date();

  tempAltaVentas: { mes: string, cantidad: number } = { mes: "", cantidad: 0 };
  tempBajaVentas: { mes: string, cantidad: number } = { mes: "", cantidad: 0 };

  constructor(
    private facturasServices: FacturasService,
    private mantenimientosService: MantenimientosService
  ) {

  }
  ngOnInit(): void {
    this.getFacturas();
    this.getMantenimientos();
    this.getData();
  }

  getMantenimientos() {
    this.mantenimientosService.getMantenimientos().subscribe(
      res => {
        this.mantenimientos = res;
      },
      err => console.error(err)
    );
  }

  getFacturas() {
    this.facturasServices.getFacturas().subscribe( // si factura.id_pago == pagos.id_pagos => el nombre del pago
      res => {
        this.facturas = res;
        this.ventasMes();
      },
      err => console.error(err)
    );
  }
  getData() {
    //console.log(this.value + " " + this.tipo);
    this.countVentDate(this.value, this.tipo);

  }
  countVentDate(tim: string, actividad: string) {
    let begIndex: number = 0;
    let endIndex: number = 0;
    let fBuscar: number = 0;
    let mDeTiempo: string = "hoy.";
    if (tim == "hoy") {
      begIndex = 8;
      endIndex = 10;
      fBuscar = this.fecha.getDate();
    } else if (tim == "mes") {
      begIndex = 5;
      endIndex = 7;
      fBuscar = this.fecha.getMonth() + 1;
      mDeTiempo = " este mes."
    } else if (tim == "year") {
      begIndex = 0;
      endIndex = 4;
      fBuscar = this.fecha.getFullYear();
      mDeTiempo = " este año."
    }
    //Ventas o mantenimientos al date
    let vD: any[] = [];
    if (actividad == "Ventas") {
      vD = this.facturas.filter((f: any) => {
        return f.fecha.substring(begIndex, endIndex) == fBuscar
      });

    } else if (actividad == "Mantenimientos") {
      vD = this.mantenimientos.filter((m: any) => {
        return m.fecha_mantenimiento.substring(begIndex, endIndex) == fBuscar
      });
    }

    //console.log(vD);
    let cantidad = vD.length;
    if (cantidad == 1) { actividad = actividad.slice(0, -1); }

    this.frase = "Has hecho " + cantidad + " " + actividad + " " + mDeTiempo;
    //substring(0, 4)); año
    //substring(5, 7));mes
    //substring(8, 10 dia
  }

  //GRAFICAR ALGO Y NO SER CIRUJA
  // #607D8B, #FFC107, #4CAF50, #E91E63, #00BCD4
  ventasMes() {
    let datos = [];
    for (let month of this.bChartLabels) {
      //datos que necesitamos, los meses y la cantidad de facturas de c/u
      datos.push({ mes: month, cantidad: 0 });
    }
    let thisYear = new Date().getFullYear().toString();
    this.thisA = thisYear;

    this.facturas = this.facturas.filter((f:any) => {
      return f.fecha.substring(0, 4) == thisYear
    });

    for (let factura of this.facturas) {
      //Como son 12 meses noma, se puede acceder al index con el mes, restandole 1 por ser indices
      let m: number = parseInt(factura.fecha.substring(5, 7)) - 1;
      //por cada factura se suma uno al mes correspondiente
      datos[m].cantidad++;
    }
    // console.log(datos);
    this.getTemps(datos);
    this.configureGraph(datos);
  }
  getTemps(array: any[]) {
    let menor = array[0];
    let mayor = array[0];

    for (let month of array) {
      //console.log(month);
      if (month.cantidad < menor.cantidad) {
        menor = month;
      }
      if (month.cantidad > mayor.cantidad) {
        mayor = month
      }
    }
    mayor.mes = mayor.mes.substring(0, 3);
    menor.mes = menor.mes.substring(0, 3);
    this.tempAltaVentas = mayor;
    this.tempBajaVentas = menor;
    //console.log(mayor);
    //console.log(menor);
  }
  configureGraph(array: any[]) {

    this.bChartLabels = [];
    let datos = [];
    // this.bChartData = [];
    this.bChartLabels = array.map((el: any) => el.mes);
    datos = array.map((el: any) => el.cantidad);
    //console.log(datos);
    //console.log(this.bChartLabels);

    this.bChartData.push({ data: datos, label: ("Ventas por mes"), backgroundColor: this.colores });
    //console.log(this.bChartData);
  }

}
