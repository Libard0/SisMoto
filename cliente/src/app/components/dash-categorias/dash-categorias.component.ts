import { Component, OnInit } from '@angular/core';
import { DetalleFacturaService } from 'src/app/services/detallefactura/detallefactura.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { DetallerepuestoService } from 'src/app/services/detallerepuesto/detallerepuesto.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-dash-categorias',
  templateUrl: './dash-categorias.component.html',
  styleUrls: ['./dash-categorias.component.css'],
})
export class DashCategoriasComponent implements OnInit {
  detallesfacturas: any = [];
  detallesrepuestos: any = [];
  productos: any = [];
  categoriasMasVendias: any = [];
  categoriasMasUsadas: any = [];
  categorias: any = [];

  tipoGr: string = 'Ventas';

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
  colores = ['#186A3B', '#239B56', '#28B463', '#2ECC71', '#58D68D'];
  /*
  DEGRADACION
  colores = ["#2C3E50", "#34495E", "#7F8C8D", "#BDC3C7", "#ECF0F1"];
  colores = ["#4A235A", "#6C3483", "#9B59B6", "#BB8FCE", "#D6DBDF"];
  colores = ["#641E16", "#922B21", "#C0392B", "#E74C3C", "#F1948A"];
  colores = ["#1B4F72", "#21618C", "#2874A6", "#2E86C1", "#3498DB"];
  
  COLORI2
  colores = ["#FF9800", "#03A9F4", "#795548", "#FFEB3B", "#9C27B0"];
  colores = ["#E91E63", "#2196F3", "#F44336", "#FFEB3B", "#4CAF50"];
  colores = ["#FF5722", "#009688", "#FFC107", "#673AB7", "#607D8B"];
  colores = ["#E74C3C", "#8E44AD", "#2ECC71", "#3498DB", "#F1C40F"];
  colores = ["#607D8B", "#FFC107", "#4CAF50", "#E91E63", "#00BCD4"];
  

*/

  ngOnInit(): void {
    this.getProductos();
  }
  constructor(
    private productosService: ProductosService,
    private detallefacturaService: DetalleFacturaService,
    private detalleRepuestosService: DetallerepuestoService,
    private categoriasService: CategoriasService
  ) {}
  getProductos() {
    this.productosService.getProductos().subscribe(
      (res) => {
        this.productos = res;
        this.getCategorias();
      },
      (err) => console.error(err)
    );
  }
  getCategorias() {
    this.categoriasService.getCategorias().subscribe(
      (res) => {
        this.categorias = res;

        this.getDetallesFactura();
        this.getDetallesRepuesto();
      },
      (err) => console.error(err)
    );
  }

  getDetallesFactura() {
    this.detallefacturaService.getDetalleFacturas().subscribe(
      (res) => {
        this.detallesfacturas = res;
        this.getCatMasVendidas();
      },
      (err) => console.error(err)
    );
  }
  getDetallesRepuesto() {
    this.detalleRepuestosService.getDetallerepuestos().subscribe(
      (res) => {
        this.detallesrepuestos = res;
        this.getCatMasUsada();
      },
      (err) => console.error(err)
    );
  }
  //metodo para obtener las categorias mas vendidas segun los detalles facturas
  getCatMasVendidas() {
    //primero obtenemos los productos mas vendidos y sus categorias
    //categoria x producto mas vendidos
    let catXprodMV: any = [];
    //Los objetos que vamos a guardar en el arreglo, necesitamos el id producto, cantidad, y la categoria
    //que obtenemos con el id
    let pr: { idProd: number; nameCate: string; cantidad: number };
    //nombre categoria
    let namecat: string = '';
    //id de la categoria
    let idC: number = 0;
    //Entonces buscamos en cada detalle de factura
    this.detallesfacturas.forEach((detalle: any) => {
      //Este indice es para las categorias mas vendidas, si la categoria ya esta en el arreglo
      let index: number = 0;
      //buscamos el cadaproducto en el arreglo, si existe necesitamos su indice
      let productoVendido = catXprodMV.find((el: any, i: number) => {
        index = i;
        return el.idProd == detalle.id_produc;
      });
      //Si encontramos el producto en el arreglo solo incementamos su cantidad
      if (productoVendido) {
        catXprodMV[index].cantidad += detalle.cant_produc;
      } else {
        //Si no agregamos uno nuevo
        //Aqui obtemos el id de la categoria para el nombre, lo hacemos con los productos
        idC = this.productos.find((p: any) => {
          return p.id == detalle.id_produc;
        }).id_categoria;
        //Con el id categoria que encontramos, buscamos su nombre
        namecat = this.categorias.find((c: any) => {
          return c.id == idC;
        }).nomb_categ;
        // finalmente, lo agregamos al arregl
        pr = {
          idProd: detalle.id_produc,
          nameCate: namecat,
          cantidad: detalle.cant_produc,
        };
        catXprodMV.push(pr);
      }
    });

    catXprodMV.sort((a: any, b: any) => {
      return b.cantidad - a.cantidad;
    });

    //Ahora si con las categorias mas vendidas
    //ya tenemos la cantidad de productos y su categoria
    //sumaremos los de la misma categoria y brevs

    this.setCatMas(catXprodMV, this.categoriasMasVendias);

    this.configureGraph();
  }

  getCatMasUsada() {
    //Donde guardaremos los datos sin estructurar como necesitamos.
    let catXmantMV: any = [];
    //que obtenemos con el id
    let pr: { idProd: number; nameCate: string; cantidad: number };
    //nombre categoria
    let namecat: string = '';
    //id de la categoria
    let idC: number = 0;
    //Entonces buscamos en cada detalle de repuestos
    this.detallesrepuestos.forEach((detalle: any) => {
      //Este indice es para las categorias mas usadas, si la categoria ya esta en el arreglo
      let index: number = 0;
      //buscamos el cadaproducto en el arreglo, si existe necesitamos su indice
      let productoVendido = catXmantMV.find((el: any, i: number) => {
        index = i;
        return el.idProd == detalle.idProducto;
      });
      //Si encontramos el producto en el arreglo solo incrementamos su cantidad
      if (productoVendido) {
        catXmantMV[index].cantidad += detalle.cantidadP;
      } else {
        //Si no agregamos uno nuevo

        // finalmente, lo agregamos al arregl
        pr = {
          idProd: detalle.idProducto,
          nameCate: '',
          cantidad: detalle.cantidadP,
        };
        catXmantMV.push(pr);
      }
    });
    //Vamos a asignar el nombre de las categorias
    for (let catUs of catXmantMV) {
      //Aqui obtemos el id de la categoria para el nombre, lo hacemos con los productos
      idC = this.productos.find((p: any) => {
        return p.id == catUs.idProd;
      }).id_categoria;

      //Con el id categoria que encontramos, buscamos su nombre
      namecat = this.categorias.find((c: any) => {
        return c.id == idC;
      }).nomb_categ;

      catUs.nameCate = namecat;
    }
    catXmantMV.sort((a: any, b: any) => {
      return b.cantidad - a.cantidad;
    });

    this.setCatMas(catXmantMV, this.categoriasMasUsadas);
  }

  setCatMas(arrayDatos: any[], arrayFinal: any[]) {
    //vamos ajunatr las categorias repetidas del primer array
    //sumando sus cantidades
    for (let cxv of arrayDatos) {
      //recorremos todos los elementos del array y extraemos los datos que necesitamos
      //nombre y cantidad
      let categoria: { nameCate: string; cantidad: number };
      //indice donde va a estar el elemento biscado(si se encuentra)
      let i: number = 0;
      let cc = arrayFinal.find((ca: any, index: number) => {
        //lo buscamos por nombre y guardamos el indice en la var i
        i = index;
        return ca.nameCate == cxv.nameCate;
      });
      //Si existe, le sumamos la cantidad
      if (cc) {
        arrayFinal[i].cantidad += cxv.cantidad;
      } else {
        //Si no existe, lo agregamos
        categoria = { nameCate: cxv.nameCate, cantidad: cxv.cantidad };
        arrayFinal.push(categoria);
      }
    }
  }

  configureGraph() {
    //Como movemos el tipo de grafico
    //inicializamos todo en vacio para que al cambiar de tipo no se sobreescriban
    this.bChartLabels = [];
    let datos = [];
    this.bChartData = [];

    //dependiendo del tipo de dato escogido, se hara con un arreglo u otro
    let array: any = [];
    if (this.tipoGr == 'Ventas') {
      //si es ventas, se usan las mas vendidas, o sea las de detalle factura
      array = this.categoriasMasVendias;
    } else {
      //si no, seran las mas usadas o las de detall repuestos
      array = this.categoriasMasUsadas;
    }
    //las etiquetas seran cada nombre de categoria
    this.bChartLabels = array.map((el: any) => el.nameCate);
    //los datos seran las cantidades que vienen de ese arreglo
    datos = array.map((el: any) => el.cantidad);
    //agregamos los datos al grafico
    this.bChartData.push({
      //los datos del eje
      data: datos,
      //el titulo, el cual cambia ed acuerdo al tipo, por eso se concatena
      label: 'Categorias mas usadas en ' + this.tipoGr,
      //los colores elegidos
      backgroundColor: this.colores,
    });
  }
}
