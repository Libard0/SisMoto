import { MantenimientosService } from 'src/app/services/mantenimientos/mantenimientos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { DetallerepuestoService } from 'src/app/services/detallerepuesto/detallerepuesto.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Producto } from 'src/app/models/productos';

@Component({
  selector: 'app-mantenimiento-list',
  templateUrl: './mantenimiento-list.component.html',
  styleUrls: ['./mantenimiento-list.component.css']
})
export class MantenimientoListComponent {

  mantenimientos: any = [];
  usuarios: any = [];
  userId: number = 0;
  userCC: string | null = '';
  logUser: boolean = false;
  constructor(
    private mantenimientosService: MantenimientosService,
    private usuariosService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
    if (sessionStorage.getItem("userRole") == '3') {
      this.logUser = true;
      this.userCC = sessionStorage.getItem("userCed");
    }
    this.getMantenimientos();


  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      res => {
        this.usuarios = res
      },
      err => console.error(err)
    )
  }
  getMantenimientos() {
    this.mantenimientosService.getMantenimientos().subscribe(
      res => {
        this.mantenimientos = res;
        if (this.logUser) {
          this.selectMant();
        }
      },
      err => console.error(err)
    );
  }

  deleteMantenimiento(id: string) {
    this.mantenimientosService.deleteMantenimiento(id).subscribe(
      res => {
        console.log(res);
        this.getMantenimientos();
      },
      err => console.error(err)
    );
  }
  nombreMan(idCliente: number): string {
    let nombre = "";
    for (let u of this.usuarios) {
      if (u.id == idCliente) {
        nombre = u.nombre;
      }
    }
    return nombre;
  }

  selectMant() {
    let manTemp = [...this.mantenimientos];
    this.mantenimientos = [];
    for (let u of this.usuarios) {
      if (u.cedula == this.userCC) {
        this.userId = u.id;
      }
    }
    for (let m of manTemp) {
      if (m.idCliente == this.userId) {
        this.mantenimientos.push(m);
      }
    }
  }

}
