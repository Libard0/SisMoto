import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';


@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.css']
})
export class ProveedoresListComponent implements OnInit {

  proveedores: any = []

  constructor(private proveedoresServices: ProveedoresService) { }

  ngOnInit(): void {
    this.getProveedores();
  }
  getProveedores() {
    this.proveedoresServices.getProveedores().subscribe(
      res => {
        this.proveedores = res;
        },
        err => console.error(err)
    );
  }

  deleteProveedor(id: string){
    this.proveedoresServices.deleteProveedor(id).subscribe(
      res => {
        console.log(res);
        this.getProveedores();
      },
      err => console.error(err)
    );
  }



}
