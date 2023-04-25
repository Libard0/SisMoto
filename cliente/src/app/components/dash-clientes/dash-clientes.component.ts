import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { FacturasService } from 'src/app/services/facturas/facturas.service';
import { MantenimientosService } from 'src/app/services/mantenimientos/mantenimientos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-dash-clientes',
  templateUrl: './dash-clientes.component.html',
  styleUrls: ['./dash-clientes.component.css'],
})
export class DashClientesComponent implements OnInit {
  //Obtendremos los clientes con mas ventas y mantenimientos
  clientesRecurrentes: any = [];
  clientesMantRec: any = [];
  //Para ventas las facturas y mantenimientos los mantenimientos
  facturas: any = [];
  mantenimientos: any = [];
  usuarios: any = [];
  //dato que se pasa al grafico para saber que mostrar
  tipoCliente: String = 'Ventas';

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
  public bChartType: ChartType = 'bar';
  //Legends
  public bChartLegend = true;
  public bChartPlugins = [pluginDataLabels];
  //Datos que vamos a cargar en las graficas
  public bChartData: ChartDataset[] = [];
  public chartColors: any;

  constructor(
    //servicios a usar, para facturas, mantenimientos y usuario
    private facturasServices: FacturasService,
    private mantenimientosService: MantenimientosService,
    private usuariosService: UsuariosService
  ) {}
  ngOnInit(): void {
    /*primero que todo, se deben obtener los usuarios y esto es porque al ser 
    asincrono el proceso de obtenerlos, se puede generar errores a veces
    porque carga unos datos y otros no*/
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (res) => {
        this.usuarios = res;
        //obtenidos los usuarios del servicio, podemos ir a los otros, factura y mantenimiento
        this.getFacturas();
        this.getMantenimientos();
      },
      (err) => console.error(err)
    );
  }
  getMantenimientos() {
    //obtenemos los mantenimientos de su servicio y procedemos a
    //buscar los clentes con mas mantenimientos
    this.mantenimientosService.getMantenimientos().subscribe(
      (res) => {
        this.mantenimientos = res;
        this.getClientesMant();
      },
      (err) => console.error(err)
    );
  }

  getFacturas() {
    //Obtener las facturas del servicio y proceder a obtener los clientes recurrentes
    this.facturasServices.getFacturas().subscribe(
      // si factura.id_pago == pagos.id_pagos => el nombre del pago
      (res) => {
        this.facturas = res;
        this.getClientesRecurr();
      },
      (err) => console.error(err)
    );
  }
  //CLIENTES RECURRENTES
  getClientesRecurr() {
    //hacemos un objeto para cada cliente, del que necesitamos la cedula(cc), nombre(nombreCLI)
    //y el numero de facturas asociadas a el, que indicara cuantas ventas ha hecho
    let clienteRec: { cc: number | any; nombreCli: string; nFacturas: number };
    //recorremos todas las facturas
    for (let f of this.facturas) {
      //llenamos el objeto con los datos de cada factura
      clienteRec = {
        cc: f.cedula,
        //para el nombre se creo un objeto que busca por cedula y por id
        nombreCli: this.findUsByN(f.cedula),
        nFacturas: 1,
      };

      //trabajando con los clientes recurrentes, vamos a obtener un indice para
      //actualizar las cantidades
      let index = 0;
      //recorremos los clientes recurrentes para ver si ya esta el cliente con la cedula
      //actual
      //podemos omitir el nombre al buscar
      const obj = this.clientesRecurrentes.find(
        (cl: { cc: number | any; nFacturas: number }, inde: number) => {
          index = inde; //el indice
          return cl.cc === clienteRec.cc;
        }
      );
      //si se encontró el cliente(obj), se actualiza la cantidad de facturas
      if (obj) {
        this.clientesRecurrentes[index].nFacturas += 1;
      } else {
        //si no se hayó, agregamos el cliente
        this.clientesRecurrentes.push(clienteRec);
      }
    }
    // Array.some(() => {});
    //Finalmente, ordenamos los clientes segun la cantidad de facturas asociadas
    this.clientesRecurrentes.sort((c1: any, c2: any) => {
      return c2.nFacturas - c1.nFacturas;
    });
    //y luego vamos a ver
    this.setGraphicData();
  }

  setGraphicData(event?: Event) {
    //Para ordenar el grafico se puede de dos formas, desde el dom, pasando evento
    //o desde el ts, sin argumento
    //Para ello se usa la variable tipo
    let tipo;
    //Si se le paso un evento, se llamo desde el DOM
    if (event) {
      //entonces obtenemos el elemento desde el cual se llamó
      let element = event.target as HTMLInputElement;
      //y obtenemossu valor, que puede ser ventas o mantenimientos
      tipo = element.value;
    } else {
      //como solo una vez es llamado desde ts, por defecto se deja ventas
      tipo = 'Ventas';
    }

    //como se llama varias veces, se debe inicializar todo en vacio
    let datos;
    this.chartColors = [];
    this.bChartLabels = [];
    this.bChartData = [];
    //Si el tipo es ventas, se trabaja con clientes recurrentes
    //los labels del grafico seran los nombres de los clientes
    //los datos la cantidad de facvturas asociadas a el,
    if (tipo == 'Ventas') {
      this.bChartLabels = this.clientesRecurrentes.map(
        (el: any) => el.nombreCli
      );
      datos = this.clientesRecurrentes.map((el: any) => el.nFacturas);
    } //Si no, entonces es mantenimientos
    else if (tipo == 'Mantenimientos') {
      //Se usa el arreglo de clientes mantenimientos
      this.bChartLabels = this.clientesMantRec.map((el: any) => el.nombreU);
      datos = this.clientesMantRec.map((el: any) => el.nMantenimientos);
    }
    //colores escogidos
    let colores = ['#FF5722', '#009688', '#FFC107', '#673AB7', '#607D8B'];

    //agregamos los datos al grafico
    this.bChartData.push({
      data: datos, //datos obtenidos de arreglo acorde al tipo
      label: 'Cliente con más ' + tipo, //titulo, que como el tipo varía, se concatena
      backgroundColor: colores,
    }); //colores
    // this.chartColors.push({ backgroundColor: "red" })
  }
  //OBTENER LOS CLIENTES CON MÁS MANTENIMIENTOS
  getClientesMant() {
    //SIMILAR A LOS RECURRENTES
    //declaramos la estructura de datos
    let clientMantenimentos: {
      idUser: number;
      nombreU: string;
      nMantenimientos: number;
    }; //recorremos todos los mantenimientos llenando la estructura
    for (let mant of this.mantenimientos) {
      clientMantenimentos = {
        idUser: mant.idCliente,
        nombreU: this.findUsByN(mant.idCliente),
        nMantenimientos: 1,
      };
      //se buscara el losclientes mantenimiento, por lo que se declara un indice
      //para saber con cual elemento trabajar en caso de encontrar
      let index = 0;
      //se busca en los clientesMant, si existe se llena el obejto y el indice
      //para actualizatr su cantidad
      //si no se agregará
      const obj = this.clientesMantRec.find(
        (
          cl: { idUser: number | any; nMantenimientos: number },
          inde: number
        ) => {
          index = inde;
          return cl.idUser === clientMantenimentos.idUser;
        }
      );
      if (obj) {
        //por si se encuentra se actualiza la cantidad
        this.clientesMantRec[index].nMantenimientos += 1;
      } else {
        //si no, se agrega
        // this.findUsByN(clientMantenimentos.idUser);
        this.clientesMantRec.push(clientMantenimentos);
      }
    }
    //se ordena para que queden primero lo de mayor cantidad
    this.clientesMantRec.sort((cl1: any, cl2: any) => {
      return cl2.nMantenimientos - cl1.nMantenimientos;
    });
  }

  /*Facturas maneja las cedulas mientras que mantenimientos usa los id de cada 
usuario, y como que se debe saber el nombre se hizo este metodo que recibe un 
argumento, que puede ser una cedula o u  id y segun esto devuelve el nombre del cliente que coincida 
con tal*/
  //finfUsByN - find user by number - encontrar usuario de acuerdo al numero que se pase
  findUsByN(idOcc: number): string {
    let usuario; //buscaremos un user
    let param: string; //el parametro sera para saber si es el id o la cedula
    /*//por el momento no hay mas de 100 usuarios, el id no subira a un numero mayor de eso
    !!!EN EL FUTURO SE MODIFICARÁ!!!
    por el momento, si el parametro es menor a 10000, debe ser un id, ya que por 
    restricciones del sistema, no se dejan guardar cedulas mmenores a 8 digitos,
    o sea 10000000
    
    */
    if (idOcc < 10000) {
      param = 'id';
    } else {
      //si el numero es mas largo, es una cedula
      param = 'cedula';
    }
    //entonces buscamos el usuario con find, note como se usa la notacion
    //de ["atributo"] de js para obtenerlo segun si es la cedula o el id
    usuario = this.usuarios.find((u: any) => u[param] == idOcc);
    //retornampos el nombre, que es lo que estamos bucando
    return usuario ? usuario.nombre : 'desconocido';
  }
}
