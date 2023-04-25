import { Component, OnInit } from '@angular/core';
import { CalificacionService } from 'src/app/services/calificacion/calificacion.service';
import { Calificacion } from 'src/app/models/calificacion';

@Component({
  selector: 'app-calificanos',
  templateUrl: './calificanos.component.html',
  styleUrls: ['./calificanos.component.css']
})
export class CalificanosComponent implements OnInit {

  constructor(
    //servicio para guardar y consultar calificaciones, no hay mas
    private calificacionService: CalificacionService
  ) {

  }
  //el model, para guardar en la bd
  calificacion: Calificacion = {
    id: 0,
    estrellas: 0,
    comentario: ""
  }
  //Estos los controlamos con el dom,, los botones y el text area
  estrellas: number = 0;
  comentario: string = "";
  ngOnInit(): void {

  }


  saveCalificacion() {
    //Cuando se habilita podremos guardar
    //como el id es autoincrement, se elimina
    delete this.calificacion.id;
    //al objeto le asignamos lo de las variables
    this.calificacion.estrellas = this.estrellas;
    this.calificacion.comentario = this.comentario;
    //Guardamos y dejamos todo como estaba
    this.calificacionService.saveCalificacion(this.calificacion)
      .subscribe(
        res => {
          console.log(res);
          this.estrellas = 0;
          this.comentario = "";
          // this.router.navigate(['/categorias']);
        },
        err => console.error(err)
      )

  }
}
