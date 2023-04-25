import { parseHostBindings } from '@angular/compiler';
import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../services/productos/productos.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  productos: any = [];
  productosFiltrados: any = [];
  logUser: boolean = false;
  valorInput = '';
  editSiEliminado: boolean = true;
  seguridad : string|null = ""; //crear variable para evitar navegar sin Login

  constructor(
    private productosService: ProductosService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.logUser = sessionStorage.getItem("userRole") == '3';
    this.seguridad = sessionStorage.getItem("userRole"); // si no hay datos de sesion
    if(this.seguridad){
      this.getProductos(); //complementa 31, permite navegar en la ruta seleccionada

    }else{
      this.router.navigate(['/home']); //complementa 31, navega al home
    }

  }

  verificarInput() {
    if (this.valorInput === '') {
      console.log('El input está vacío');
    } else {
      console.log('El input no está vacío');
    }
  }
  getProductos() {
    this.productosService.getProductos().subscribe(
      res => {
        this.productos = res;
        this.productosFiltrados = this.productos;
      },
      err => console.error(err)
    );
  }

  getProducto(id: string) {
    this.productosService.getProducto(id).subscribe(
      res => {
        this.productos = res;
      },
      err => console.error(err)
    );
  }

  deleteProducto(id: string) {
    this.editSiEliminado = false;
    if (window.confirm("¿Desea eliminar este producto?")) {


      this.productosService.deleteProducto(id).subscribe(
        res => {
          console.log(res);
          this.getProductos();

        },
        err => console.error(err)
      );
    }else{
      //this.editSiEliminado = true;
    }
  }

  filtrarProductos() {
    this.productosFiltrados = this.productos.filter((producto: any) => producto.marca.toLowerCase().includes(this.valorInput.toLowerCase()));
  }

  goView(id: number) {
    if(this.editSiEliminado){
      this.router.navigate(['/productos/viewfull', id]);

    }
  }

}
