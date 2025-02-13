import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  productos: any = [];
  categorias: any = [];
  idUs: number = 0;

  constructor(private productosService: ProductosService,private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    //Vamos a mostrar productos en el home entonxes debemos obtenerlos
    this.getProductos();
    this.getCategorias();
  }
  /**
   * Obtener los productos usando el servicio
   */
  getProductos() {
    this.productosService.getProductos().subscribe(
      (res) => {
        this.productos = res;
      },
      (err) => console.error(err)
    );
  }
  getCategorias(){
    this.categoriasService.getCategorias().subscribe(
      (res) => {
        console.log(res)
        this.categorias = res;
      },
      (err) => console.error(err)
    );
  }
}
