import { Component, OnInit, HostBinding } from '@angular/core';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  usuarios: any = [];

  constructor(private usuariosServices: UsuariosService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosServices.getUsuarios().subscribe(
      (res) => {
        this.usuarios = res;
        this.selectUsuarios();
      },
      (err) => console.error(err)
    );
  }

  deleteUsuario(id: string) {
    let confirmTion = window.confirm('¿Está seguro de eliminar este ususario?');
    if (confirmTion) {
      this.usuariosServices.deleteUsuario(id).subscribe(
        (res) => {
          console.log(res);
          this.getUsuarios();
        },
        (err) => console.error(err)
      );
    }
  }
  selectUsuarios() {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].idtipousuario != 3) {
        this.usuarios.splice(i, 1);
        i -= 1;
      }
    }
    console.log(this.usuarios);
  }
}
