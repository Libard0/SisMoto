import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  session: boolean = false;
  emp: boolean = false;
  userr: boolean = false;
  admin: boolean = false;
  usuarios: any = [];
  idU: number = 0;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
    if (sessionStorage.getItem("ses")) {
      this.session = true;
      //console.log(this.usuarios);
    }
    this.setElementosMostrables();
    //console.log("session: " + this.session);
    //console.log("emp: " + this.emp);
    //console.log("userr: " + this.userr);
    //console.log("admin: " + this.admin);
    //console.log((this.session && (this.admin || this.userr)));


  }
  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      res => {
        this.usuarios = res;
        //console.log(this.usuarios);
        this.findUser();
      },
      err => console.error(err)
    )
  }
  findUser() {
    let ced = sessionStorage.getItem("userCed");
    for (let u of this.usuarios) {
      if (u.cedula == ced) {
        this.idU = u.id;
      }
    }
    //console.log(this.idU);
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate([`/Home`]);
    // window.location.reload();
    location.replace('http://localhost:4200/Home');
  }
  setElementosMostrables() {
    if (this.session) {
      if (sessionStorage.getItem("userRole") == '1') { //admin
        this.admin = true;
      } else if (sessionStorage.getItem("userRole") == '2') { //usuario
        this.userr = true;
      } else if (sessionStorage.getItem("userRole") == '3') { //cliente
        this.emp = true;
      }
    }
  }

}
