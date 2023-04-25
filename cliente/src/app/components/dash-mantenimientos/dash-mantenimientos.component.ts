import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { MantenimientosService } from 'src/app/services/mantenimientos/mantenimientos.service';

@Component({
  selector: 'app-dash-mantenimientos',
  templateUrl: './dash-mantenimientos.component.html',
  styleUrls: ['./dash-mantenimientos.component.css'],
})
export class DashMantenimientosComponent implements OnInit {
  //Vamos a ver mantenimientos deorados y por estado
  estado: string = 'all';
  mantenimientos: any = [];

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
  };
  //Tipo de grafico que queremos: ejem: line, b, radar
  public bChartType: ChartType = 'polarArea';
  //Legends
  public bChartLegend = true;
  public bChartPlugins = [pluginDataLabels];
  //Datos que vamos a cargar en las graficas
  public bChartData: ChartDataset[] = [];
  public chartColors: any;

  constructor(private mantenimientosService: MantenimientosService) {}
  ngOnInit(): void {
    this.getMantenimientos();
  }

  getMantenimientos() {
    this.mantenimientosService.getMantenimientos().subscribe(
      (res) => {
        this.mantenimientos = res;
        this.setDatos();
      },
      (err) => console.error(err)
    );
  }

  setDatos() {
    //Segun el estado se van a mostrar los mantenimientos
    let mantenimientosMostrar;
    //primero se organizan todos los mantenimientos acorde a las horas gastadas
    this.mantenimientos.sort((a: any, b: any) => {
      return b.horas_empleadas - a.horas_empleadas;
    });
    //Todos se asignan, por defecto se muestran todos
    mantenimientosMostrar = this.mantenimientos;

    //si el estado es finalizado, los filtramos
    if (this.estado == 'finalizado') {
      mantenimientosMostrar = this.mantenimientos.filter((m: any) => {
        return (
          m.estadoMantenimiento == 'Finalizado Facturado' ||
          m.estadoMantenimiento == 'Finalizado' ||
          m.estadoMantenimiento == 'Finalizado con retraso'
        );
      });
      //igualmente filtramos en caso de ser pendiente
    } else if (this.estado == 'Pendiente') {
      mantenimientosMostrar = this.mantenimientos.filter((m: any) => {
        return m.estadoMantenimiento == this.estado;
      });
    }
    //Procedemos a alistar los datos para mostrarlos en grafica
    //Mostratremos solo 5
    mantenimientosMostrar = mantenimientosMostrar.filter(
      (m: any, i: number) => i < 5
    );
    this.setGr(mantenimientosMostrar);
  }
  setGr(array: any[]) {
    //antes dejamos los datos en blanco para no sobreescribir
    this.bChartLabels = [];
    this.bChartData = [];

    //Asignamos la etiqueta como el id y la plca del mantenimiento
    this.bChartLabels = array.map(
      (m: any) => m.id_mantenimiento + ' - ' + m.placa.toUpperCase()
    );
    //los datos seran las horas
    let datos = array.map((m: any) => m.horas_empleadas);

    let colores = ['#FF5722', '#009688', '#FFC107', '#673AB7', '#607D8B'];

    this.bChartData.push({
      data: datos,
      label: 'Mantenimientos + demorados- ' + this.estado,
      backgroundColor: colores,
    });
  }
}
