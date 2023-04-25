import { Component, OnInit, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { ProductosService } from '../../services/productos/productos.service';
import { Producto } from '../../models/productos';
import { ActivatedRoute,Router } from '@angular/router';

'use strict'

@Component({
  selector: 'app-viewfull',
  templateUrl: './viewfull.component.html',
  styleUrls: ['./viewfull.component.css']
})

export class ViewfullComponent implements OnInit {

  @ViewChild('grande', { static: true }) grandeRef!: ElementRef;
  @ViewChild('punto', { static: true }) puntoRef!: ElementRef;
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
  };

  viewfull: boolean = false;

  grande!: HTMLElement;
  puntos!: NodeListOf<HTMLElement>;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {

    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.productosService.getProducto(params['id'])
      .subscribe(
        res =>{
          console.log(res)
          this.producto = res;
          this.viewfull = true;
        },
        err => console.error(err)
      )
    }

  // this.grande = this.grandeRef.nativeElement;
  // this.puntos = this.puntoRef.nativeElement.querySelectorAll('.punto');

  // Codigo para el carrusel

  // var grande    = document.querySelector('.grande') as Element | "";
  var grande = document.getElementsByClassName('grande');
  const punto     = document.querySelectorAll('.punto');

// Cuando CLICK en punto
    // Saber la posición de ese punto
    // Aplicar un transform translateX al grande
    // QUITAR la clase activo de TODOS puntos
    // AÑADIR la clase activo al punto que hemos hecho CLICK

// Recorrer TODOS los punto
  punto.forEach( ( cadaPunto , i )=> {
    // Asignamos un CLICK a cadaPunto
    punto[i].addEventListener('click',()=>{

        // Guardar la posición de ese PUNTO
        let posicion  = i
        // Calculando el espacio que debe DESPLAZARSE el GRANDE
        let operacion = posicion * -50

        // MOVEMOS el grand
        // if  (grande !== null) {
        //     grande.style.transform = `translateX(${ operacion }%)`
        // }
        for (i = 0; i < grande.length; i++) {
          const slide = grande[i];

          if (slide instanceof HTMLElement) {
            slide.style.transform = `translateX(${ operacion }%)`
          }

        }

        // // Recorremos TODOS los punto
        punto.forEach( ( cadaPunto , i )=>{
            // Quitamos la clase ACTIVO a TODOS los punto
            cadaPunto.classList.remove('activo')
        })
        // // Añadir la clase activo en el punto que hemos hecho CLICK
        punto[i].classList.add('activo')

    })
  })

  }

}
