import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { TipousuarioService } from 'src/app/services/tipousuario/tipousuario.service';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css'],
})
export class EmpleadosListComponent implements OnInit {
  /**
   * CLASE PARA LISTAR LOS EMPLEADOS
   * necesitamos un arreglo a mostrar - empleado
   * uno para traer todos los usuarios y uno de tipo de usuario
   */
  empleados: any = [];
  usuarios: any = [];
  tipoUsuarios: any = [];

  constructor(
    private usuarioservice: UsuariosService,
    private tipousuarioservice: TipousuarioService
  ) {}

  ngOnInit(): void {
    //al iniciar traemos los usuarios, usando el servicio
    this.getUsuarios();
  }
  getUsuarios() {
    this.usuarioservice.getUsuarios().subscribe(
      (res) => {
        this.usuarios = res;
        this.getTiposUsuarios();
        //filtramos los empleados, o sea, los tipo usuario 1 y 2
        this.empleados = this.usuarios.filter(
          (el: any) => el.idtipousuario == 1 || el.idtipousuario == 2
        );
      },
      (err) => console.error(err)
    );
  }
  /**Método para eliminar usuarios, el id lo obtemos del front, de donde se está
   * mostrando
   */
  deleteUsuario(id: string) {
    this.usuarioservice.deleteUsuario(id).subscribe(
      (res) => {
        console.log(res);
        this.getUsuarios();
      },
      (err) => console.error(err)
    );
  }
  getTiposUsuarios() {
    //Tipos de usuario para tener el dato
    //los traemos de la base de datos cons u servicio
    this.tipousuarioservice.getTipousuarios().subscribe(
      (res) => {
        this.tipoUsuarios = res;
      },
      (err) => console.error(err)
    );
  }
  /**Para obtener el tipo de usuario usando el idtipo de usuario */
  getTipo(id: number): string {
    let t = this.tipoUsuarios[id - 1];
    return t ? t.tipo : 'usuario';
  }
}
