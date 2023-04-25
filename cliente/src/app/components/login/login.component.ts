import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos/productos.service';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    cedula: 0,
    nombre: '',
    apellido: '',
    celular: 0,
    correo: '',
    contrasena: '',
    created_at: new Date(),
    idtipousuario: 0,
  };


  logIn: Boolean = false;
  productos: any = [];
  usuarios: any = [];

  contrasena: string = '';

  userdata: { cedula: string; contrasena: string } = {
    cedula: '',
    contrasena: '',
  };
  formulario!: FormGroup;

  constructor(private usuariosService: UsuariosService,
    private formBuilder: FormBuilder
  ) { this.crearFormulario() }

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe(response => {
      this.usuarios = response
    },
      err => console.error(err)
    )
  }

  get cedulaNovalida() {
    return this.formulario.get('cedula')?.invalid && this.formulario.get('cedula')?.touched;
  }
  get contrasenaNovalido() {
    return this.formulario.get('contrasena')?.invalid && this.formulario.get('contrasena')?.touched;
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      contrasena: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&\/\+()@])([A-Za-z\d$@$!%*?&]|[^ ]){8,12}$/)]],
    })
  }

  lookForUser(): void {
    //const params = this.activedRoute.snapshot.params;

    if (this.userdata.cedula) {
      this.usuariosService.getUsuario(this.userdata.cedula + '').subscribe(
        (res) => {
          console.log(res, 'Message');
          this.usuario = res;
          console.log(this.usuario);
          this.getUser();
        },
        (err) => {
          console.error(err);
          window.alert('Cedula no encontrada');
        }
      );
    }
  }
  // params = viene desde el navegador.
  // si params es == extricatemente = a la contrasena de la BD = Login aprobado


  getUser() {
    console.log(this.contrasena);
    console.log(this.formulario);
    const hash = CryptoJS.SHA256(this.userdata.contrasena).toString(); // genera el hash de la contraseña
    const cedula = +this.userdata.cedula; // Convierte la cedula ingresada a un número
    console.log(cedula);
    console.log(this.usuario);
    console.log(this.userdata);
    console.log(hash);
    if (
      this.usuario &&
      hash === this.usuario.contrasena &&
      cedula === this.usuario.cedula
    ) {
      let usuariosx = this.usuarios.find((u:any)=>u.cedula == this.userdata.cedula)
      window.alert('Bienvenido ' + usuariosx.nombre + ' ' + usuariosx.apellido);
      this.logIn = true;
      sessionStorage.setItem('ses', this.logIn + '');
      sessionStorage.setItem('userCed', this.usuario.cedula + '');
      sessionStorage.setItem('userRole', this.usuario.idtipousuario + '');
      location.replace('http://localhost:4200/Home');
    } else {
      window.alert('Contraseña o Cédula incorrecta');
    }
  }
}
