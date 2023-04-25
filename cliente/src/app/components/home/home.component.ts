import { Component, OnInit, HostBinding } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  productos: any = [];
  idUs: number = 0;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    //Vamos a mostrar productos en el home entonxes debemos obtenerlos
    this.getProductos();
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
}
