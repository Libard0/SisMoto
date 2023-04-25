import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleados';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empleados-form',
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css'],
})
export class EmpleadosFormComponent implements OnInit {
  /**
   * Interfaz o modelo del empleado
   */
  empleado: Empleado = {
    id: 0,
    cedula: 0,
    nombre: '',
    apellido: '',
    cargo: '',
    correo: '',
    contrasena: '',
  };
  //Variable para saber si se va a agregar o deitar
  edit: boolean = false;

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /**
     * Si se trae un parametro por url, es que se va a editar, por eso hailitamos edit
     * y traemos el usuario usando el servicio
     */
    const params = this.activedRoute.snapshot.params;
    if (params['id']) {
      this.empleadosService.getEmpleado(params['id']).subscribe(
        (res) => {
          this.empleado = res;
          this.edit = true;
        },
        (err) => console.error(err)
      );
    }
  }
  /**Una vez llenos los datos, se guarda usando el servicio en la base de datos
   * y nos dirigimos a la ruta empleados
   */
  saveNewEmpleado() {
    delete this.empleado.id;

    this.empleadosService.saveEmpleado(this.empleado).subscribe(
      (res) => {
        this.router.navigate(['/empleados']);
      },
      (err) => console.error(err)
    );
  }
  /**
   * Metodo para actualizar el empleado en la base de datos usando el servicio
   */
  updateEmpleado() {
    this.empleadosService
      .updatedEmpleado({ id: this.empleado.id, updatedEmpleado: this.empleado })
      .subscribe(
        (res) => {
          this.router.navigate(['/empleados']);
        },
        (err) => console.error(err)
      );
  }
}
