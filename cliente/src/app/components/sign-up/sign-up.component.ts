import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuarios';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  usuario: Usuario = {
    id: 0,
    cedula: 0,
    nombre: '',
    apellido: '',
    celular: 0,
    correo: '',
    contrasena: '',
    created_at: new Date(),
    idtipousuario: 3
  }
  cedula: string = '';
  celular: string = '';

  userdata: any = [];
  // usuarioExistente: { cedula: number, contrasena: string } | any = { cedula: 0, contrasena: '' };

  pass: { contra: string } = {
    contra: ''
  }

  formulario!: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { this.crearFormulario() }



  ngOnInit(): void {
    this.getUser();
  }

  get cedulaNovalida() {
    return this.formulario.get('cedula')?.invalid && this.formulario.get('cedula')?.touched;
  }

  get nombreNovalido() {
    return this.formulario.get('nombre')?.invalid && this.formulario.get('nombre')?.touched;
  }

  get apellidoNovalido() {
    return this.formulario.get('apellido')?.invalid && this.formulario.get('apellido')?.touched;
  }

  get celularNovalido() {
    return this.formulario.get('celular')?.invalid && this.formulario.get('celular')?.touched;
  }

  get correoNovalido() {
    return this.formulario.get('correo')?.invalid && this.formulario.get('correo')?.touched;
  }

  get contrasena1Novalido() {
    return this.formulario.get('contrasena1')?.invalid && this.formulario.get('contrasena1')?.touched;
  }

  get contrasena2Novalido() {
    return this.formulario.get('contrasena2')?.invalid && this.formulario.get('contrasena2')?.touched;
  }

  get contrasena2NoIgual() {
    return (this.formulario.get('contrasena2')?.value !== this.formulario.get('contrasena1')?.value) && this.formulario.get('contrasena2')?.touched;
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]+$/)]],
      celular: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      correo: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*[a-zA-Z0-9.-]+\.(com|es|msm|edu\.co)$/)]],
      // correo: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}){1,2}$/)]],
      contrasena1: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&\/\+()@])([A-Za-z\d$@$!%*?&]|[^ ]){8,12}$/)]],
      contrasena2: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&\/\+()@])([A-Za-z\d$@$!%*?&]|[^ ]){8,12}$/)]]
    },{
      Validators: this.contrasenasIguales('contrasena1','contrasena1')
    }
    )
    console.log(this.formulario);
  }

  contrasenasIguales(contra1Name: string, contra2Name: string){

    return(formGroup: FormGroup) => {
      const contra1Control = formGroup.get(contra1Name);
      const contra2Control = formGroup.get(contra2Name);

      if (contra1Control?.value === contra2Control?.value) {
        contra2Control?.setErrors(null);
      }else{
        contra2Control?.setErrors({noIgual: true})
      }
    }

  }

  contrasenaNoValida(){
    const contra1 = this.formulario.get('contrasena1')?.value;
    const contra2 = this.formulario.get('contrasena2')?.value;
    // if (contra1 !== contra2){
    //   return true;
    // }else{
    //   return false;
    // }
    return contra1 !== contra2;
  }

  saveNewUser() {


    this.contrasenaNoValida();

    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    if (this.buscarExistente(this.cedula + "")) {
      window.alert("El número de cédula ya se encuentra registrado");
    }

    else {
      this.usuario.cedula = +this.cedula;
      this.usuario.celular = +this.celular;

      delete this.usuario.created_at;
      delete this.usuario.id;

      // Encriptar la contraseña con CryptoJS
      const encryptedPass = CryptoJS.SHA256(this.usuario.contrasena + '').toString();
      this.usuario.contrasena = encryptedPass;
      this.usuariosService.saveUsuario(this.usuario)
        .subscribe(
          res => {
            // window.alert("Usuario registrado con éxito");

            this.router.navigate(['/logIn']);
          },
          err => console.error(err)
        )
    }
  }
  getUser() {
    this.usuariosService.getUsuarios()
      .subscribe(
        res => {
          this.userdata = res;
          // console.log(this.userdata);
          // window.alert("El número de cédula ya se encuentra registrado");
        },
        err => console.error(err)
      )
  }

  buscarExistente(cc: string): boolean {
    let existe: boolean = false;
    // const ccNumero = Number(cc); // Convertir el valor cc a número
    for (let usuario of this.userdata) {
      if (usuario.cedula == cc) {
        console.log(usuario);
        existe = true;
        break;
      }
    }
    return existe;
  }

}
