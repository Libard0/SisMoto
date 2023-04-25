import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedores';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proveedores-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.css']
})
export class ProveedoresFormComponent implements OnInit {

  proveedor: Proveedor = {
    id: 0,
    nit_prov: 0,
    nombre_prov: '',
    correo: '',
    telefono: 0,
    descripcion: '',
    direccion: '',
  }

// Obtenemos los input en valor string para luego pasearlos a enteros, asi el campo siempre estara vacio
  nit_prov: string = '';
  telefono: string = '';

  //Obtenemos los proveedores porque necesitamos revisar que no se vaya a guardar uno igual
  proveedores: any = [];

  //Si se traen parametros por url, esto pasa a true, indicandoque vamos a editar un prov
  edit: boolean = false;

  constructor(private proveedoresService: ProveedoresService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //obtenemos los proveedores para saber si existe
    this.getProveedores();
    //paramatros via url
    const params = this.activedRoute.snapshot.params;
    //Si hay un id, obtenemos el proveedor para editar
    if (params['id']) {
      this.proveedoresService.getProveedor(params['id'])
        .subscribe(
          res => {
            console.log(res)
            this.proveedor = res;
            //Si editar, se llama al metodo update
            this.edit = true;
          },
          err => console.error(err)
        )
    }

  }

  //metodo para guardar un provvedor usando el servicio
  saveNewProveedor() {
    //el id es autoincrement, por eso se elimina
    delete this.proveedor.id;
    //Si ya existe un proveedor con el nit, se muestra alerta
    if (this.buscarExistente()) {
      window.alert("El proveedor ya se encuentra registrado, prueba otro");
    } else {//si no, se guarda usando el servicio

      this.proveedor.nit_prov = +this.nit_prov;
      this.proveedor.telefono = +this.telefono;

      this.proveedoresService.saveProveedor(this.proveedor)
        .subscribe(
          res => {
            console.log(res);
            //Una vez guardado, nos dirige a la pestaña de los proveedores
            this.router.navigate(['/proveedores']);
          },
          err => console.error(err)
        )
    }

  }
  //para actualizar si edit == true, se pasa por parametro al service
  updateProveedor() {
    this.proveedoresService.updatedProveedor({ id: this.proveedor.id, updatedProveedor: this.proveedor })
      .subscribe(
        res => {
          console.log(res);
          //de nuevo, navegamos de vuelta a proveedores
          this.router.navigate(['/proveedores']);
        },
        err => console.error(err)
      )
  }

  //Obtenemos todos los proveedores para el tema de la verificacion
  getProveedores() {
    this.proveedoresService.getProveedores()
      .subscribe(
        res => {
          //lo asignamos al arreglo de proveedores
          console.log(res);
          this.proveedores = res;
        },
        err => console.error(err)
      )
  }
  //metodo que si encuentra un proveedor con el nit que se esta pasando muestra alerta
  buscarExistente(): boolean {
    //El buen metodo find, si lo encuentra, retorna true, si no, false
    let p = this.proveedores.find((p: any) => p.nit_prov == this.proveedor.nit_prov);

    return p ? true : false;
  }

}
