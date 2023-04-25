import { Component } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
// import * as $ from 'jquery';
// import 'fullcalendar';
// import 'fullcalendar/dist/fullcalendar.min.css';
// import 'fullcalendar-scheduler';
// import '@types/fullcalendar';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent {

  contenido : number = 0;
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.contenido = params['id'];

  }

}


