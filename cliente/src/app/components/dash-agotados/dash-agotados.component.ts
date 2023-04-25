import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-dash-agotados',
  templateUrl: './dash-agotados.component.html',
  styleUrls: ['./dash-agotados.component.css']
})
export class DashAgotadosComponent implements OnInit{
  //CLASE PARA OBTENER PRODUCTOS QUE SE ESTÄN AGOTANDO

  //obtenemos todos los productos
  productos: any = [];
  //arreglo para guardar los que cumplan la condicion
  productosAcabandoS: any = [];
  constructor(
    //servicio para relacionar con la base de datos
    private productosService: ProductosService,

  ) {

  }
  ngOnInit(): void {
    //Obtener todos los productos
    this.getProductos();
  }
  //uso del servicio para obtener los productos
  getProductos() {
    this.productosService.getProductos().subscribe(
      res => {
        this.productos = res;
        //Poner los de menos stock en el arreglo
        this.setProductosConMenosStock();
      },
      err => console.error(err)
    );
  }
  


  setProductosConMenosStock() {
    //Para hacerlo, usamos el metodo filter,
    // buscando los que tengan menos de 5, esto se modificará a conveniencia del cliente
    this.productosAcabandoS = this.productos.filter((pr: any) => pr.cantidad <= 5);
    // console.log("this.productosAcabandoS");
    // console.log(this.productosAcabandoS);
  }

}
