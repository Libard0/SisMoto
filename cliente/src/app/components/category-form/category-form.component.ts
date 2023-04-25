import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/productos';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  //modelo de la categoria a guardar/actualizar
  categoria: Categoria = {
    id: 0,
    nomb_categ: ''
  };
  //categorias para revisar si ya existe
  categorias: any = [];

  edit: boolean = false;

  constructor(private categoriasServices: CategoriasService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //traemos todas las categorias para revisar si existe una igual
    this.categoriasServices.getCategorias()
      .subscribe(
        res => {
          this.categorias = res;
        },
        err => console.error(err)
      )

    //parametros por url para saber si se va a editar o no
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.categoriasServices.getCategoria(params['id'])
        .subscribe(
          res => {
            this.categoria = res;
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  //metodo de guardar categoria que valida si existe o no una categoria mostrando una alerta
  saveNewCategoria() {
    if (this.buscarExistente()) {
      window.alert("La categoria ya existe");
    } else {

      this.categoriasServices.saveCategoria(this.categoria)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/categorias']);
          },
          err => console.error(err)
        )
    }
  }
  //Si se trae parametro via url, se actualiza con este metodo
  updateCategoria() {
    this.categoriasServices.updatedCategoria({ id: this.categoria.id, updatedCategoria: this.categoria })
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/categorias']);
        },
        err => console.error(err)
      )
  }
  //validar si existe una categoria validando en las categorias
  buscarExistente(): boolean {
    let cat = this.categorias.find((c: any) => c.nomb_categ == this.categoria.nomb_categ);
    return cat ? true : false;
  }


}
