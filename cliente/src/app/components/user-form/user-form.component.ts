import { Component, HostBinding, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios';
import { TipousuarioService } from 'src/app/services/tipousuario/tipousuario.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  usuario: Usuario = {
    id: 0,
    cedula: 0,
    nombre: '',
    apellido: '',
    celular: 0,
    correo: '',
    contrasena: '',
    created_at: new Date(),
    idtipousuario: 3,
  }

  tipoUsuarios: any = [];
  userdata: any = [];
  clienteLog: boolean = false;
  edit: boolean = false;
  admin: boolean = false;
  logUs: boolean = false;

  cedula: string = '';
  celular: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private tipousuarioservice: TipousuarioService

  ) { }

  ngOnInit(): void {
    this.logUs = sessionStorage.getItem('userCed')?true:false;

    const params = this.activedRoute.snapshot.params;
    this.clienteLog = sessionStorage.getItem("userRole") == '3';
    this.admin = sessionStorage.getItem("userRole") == '1';
    this.usuariosService.getUsuarios()
      .subscribe(
        res => {
          this.userdata = res;
          console.log(this.userdata);
          // window.alert("El número de cédula ya se encuentra registrado");
        },
        err => console.error(err)
      )

    if (params['id']) {
      this.usuariosService.getUsuario(params['id'])
        .subscribe(
          res => {
            console.log(res)
            this.usuario = res;
            this.edit = true;
          },
          err => console.error(err)
        )
    }

    this.tipousuarioservice.getTipousuarios()
      .subscribe(
        res => {
          console.log(res)
          this.tipoUsuarios = res;
          console.log(this.tipoUsuarios);
        },
        err => console.error(err)
      )
  }

  saveNewUser() {
    if (this.buscarExistente(this.cedula + "")) {
      window.alert("El número de cédula ya se encuentra registrado");
    } else {
      this.usuario.cedula = +this.cedula;
      this.usuario.celular = +this.celular;

      delete this.usuario.created_at;
      delete this.usuario.id;

      this.usuariosService.saveUsuario(this.usuario)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/usuarios']);
          },
          err => console.error(err)
        )
    }
  }

  updateUsuario() {
    delete this.usuario.created_at;
    this.usuariosService.updatedUsuario({ id: this.usuario.id, updatedUsuario: this.usuario })
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/usuarios']);
        },
        err => console.error(err)
      )
  }

  buscarExistente(cc: string): boolean {
    let existe: boolean = false;
    for (let usuario of this.userdata) {
      if (usuario.cedula == cc) {
        existe = true;
        break;
      }
    }
    return existe;
  }

}
