import { isPlatformBrowser } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Producto } from '../../models/productos';
import { ProductosService } from '../../services/productos/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  producto: Producto = {
    id: 0,
    marca: '',
    referencia: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    talla: '',
    imagen: '',
    fecha: '',
    id_categoria: 0,
    idProveedor: 0,
  };

  proveedores: any = [];
  productos: any = [];

  categorias: any = [];
  edit: boolean = false;

// Para convertir los datos de los inputs a string y que estos queden vacios
  precio: string = '';
  cantidad: string = '';

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private categoriasServices: CategoriasService,
    private proveedoresServices: ProveedoresService
  ) {}

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.productosService.getProducto(params['id']).subscribe(
        (res) => {
          // console.log(res)
          this.producto = res;
          this.edit = true;
        },
        (err) => console.error(err)
      );
    }

    this.productosService.getProductos().subscribe(
      (res) => {
        // console.log(res)
        this.productos = res;
      },
      (err) => console.error(err)
    );

    this.categoriasServices.getCategorias().subscribe(
      (res) => {
        // console.log(data);
        this.categorias = res;
      }
    );
    this.proveedoresServices.getProveedores().subscribe((res) => {
      // console.log(res);
      this.proveedores = res;
    });
  }

  saveNewProduct() {
    let prod = this.productos.find(
      (p: any) => p.referencia == this.producto.referencia
    );
    if (prod) {
      console.log(prod);
      window.alert('Producto ya existe');
    } else {
      this.producto.precio = +this.precio; //Se parcean los datos con las variables de las lineas 39-40
      this.producto.cantidad = +this.cantidad;

      delete this.producto.id;

      this.productosService.saveProducto(this.producto).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/productos']);
        },
        (err) => console.error(err)
      );
    }
  }

  updateProduct() {
    delete this.producto.fecha;
    this.productosService
      .updatedProducto({ id: this.producto.id, updatedProducto: this.producto })
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/productos']);
        },
        (err) => console.error(err)
      );
  }
}
