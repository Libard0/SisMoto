import { Component, OnInit, HostBinding } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  @HostBinding('class') classes = 'row';
  //arreglo con todas las categorias
  categorias: any = [];
  //servicio para consultarlas todas
  constructor(private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    //Obtener las categorias usando el servicio 
    this.getCategorias();
  }

  getCategorias(){
    //uso del servicio
    this.categoriasService.getCategorias().subscribe(
      res => {
        this.categorias = res;
      },
      err => console.error(err)
    );
  }

  //metodo para eliminar usando el id que se pasa desde el DOM
  deleteCategoria(id: string){
    this.categoriasService.deleteCategoria(id).subscribe(
      res => {
        console.log(res);
        this.getCategorias();
      },
      err => console.error(err)
    );
  }

}
