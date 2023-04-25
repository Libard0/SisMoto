import { Component, OnInit } from '@angular/core';
import { CalificacionService } from 'src/app/services/calificacion/calificacion.service';


import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
@Component({
  selector: 'app-dash-calificacion',
  templateUrl: './dash-calificacion.component.html',
  styleUrls: ['./dash-calificacion.component.css']
})
export class DashCalificacionComponent implements OnInit {
  calificaciones: any = [];

  constructor(
    private calificacionService: CalificacionService,

  ) {
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      y: {
        beginAtZero: true
      }
    },
    indexAxis: 'y'

  };
  public barChartLabels: string[] = [];
  //Tipo de grafico que queremos: ejem: line, bar, radar
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  //Datos que vamos a cargar en las graficas
  public barChartData: ChartDataset[] = [];
  public chartColors: any;


  //Arreglo de los colores que vamos a pasar
  private bcolores: any = ["#FFFF00", "#FFA500", "#FF6347", "#FF4500", "#FF0000"]
  private colores: any = [
    "#FFFFE0",
    "#FFDAB9",
    "#FFC0CB",
    "#FFB6C1",
    "#FFA07A",
  ];


  ngOnInit(): void {
    this.getCalificaciones();
  }
  /**
 * Recupera las calificaciones a través del servicio de calificaciones
 * y las almacena en la propiedad 'calificaciones'.
 */
  getCalificaciones(): void {
    // Realiza una solicitud HTTP al servicio de calificaciones para recuperar las calificaciones.
    // Cuando se recibe una respuesta, asigna las calificaciones a la propiedad 'calificaciones'.
    this.calificacionService.getCalificacion().subscribe(
      res => {
        this.calificaciones = res;
        this.configureGraph();
      }
    );
  }

  //configura el grafico con los datos obtenidos del servicio
  configureGraph() {
    //los datos son una estructura con el numero de estrellas y
    //la cantidad de calificaciones que hay con dicha cantidad
    //luego, se puede acceder a cada elemento via indice
    let datos = [{ nestrella: 1, cantidad: 0 }, { nestrella: 2, cantidad: 0 }, { nestrella: 3, cantidad: 0 }, { nestrella: 4, cantidad: 0 }, { nestrella: 5, cantidad: 0 }];
    //se suma 1
    for (let cal of this.calificaciones) {
      let i = cal.estrellas - 1;
      datos[i].cantidad += 1;
    }
    //lo revertimos para que quede en orden 5,4,3,2,1 y no 1,2,3,4,5
    datos.reverse();
    //a los label se les concatena una estrella
    this.barChartLabels = datos.map((el: any) => el.nestrella + "⭐");
    //los datos que se pasan al grafico vienen de los datos de arriba
    let data = datos.map((el: any) => el.cantidad);
    //con todo losto agregamos al charData para mostrar en el grafico
    this.barChartData.push(
      {
        data: data,
        //Titulo
        label: "Experiencia de usuario",
        //Colores de los elementos
        backgroundColor: this.bcolores,
        // borderColor: this.bcolores,
        // borderWidth: 2
      }
    );

  }
}
