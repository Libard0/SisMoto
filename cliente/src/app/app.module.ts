import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalificanosComponent } from './components/calificanos/calificanos.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashClientesComponent } from './components/dash-clientes/dash-clientes.component';
import { DashMantenimientosComponent } from './components/dash-mantenimientos/dash-mantenimientos.component';
import { DashVentasComponent } from './components/dash-ventas/dash-ventas.component';
import { DashCategoriasComponent } from './components/dash-categorias/dash-categorias.component';
import { DashProdMantenimientosComponent } from './components/dash-prod-mantenimientos/dash-prod-mantenimientos.component';
import { DashProductosComponent } from './components/dash-productos/dash-productos.component';
import { EmpleadosFormComponent } from './components/empleados-form/empleados-form.component';
import { EmpleadosListComponent } from './components/empleados-list/empleados-list.component';
import { FacturainfoComponent } from './components/facturainfo/facturainfo.component';
import { FacturasFormComponent } from './components/facturas-form/facturas-form.component';
import { FacturasListComponent } from './components/facturas-list/facturas-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MantenimientoFormComponent } from './components/mantenimiento-form/mantenimiento-form.component';
import { MantenimientoListComponent } from './components/mantenimiento-list/mantenimiento-list.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { ProveedoresFormComponent } from './components/proveedores-form/proveedores-form.component';
import { ProveedoresListComponent } from './components/proveedores-list/proveedores-list.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserInitViewComponent } from './components/user-init-view/user-init-view.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ViewfullComponent } from './components/viewfull/viewfull.component';




import { ProductosService } from './services/productos/productos.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashCalificacionComponent } from './components/dash-calificacion/dash-calificacion.component';
import { DashRotacionComponent } from './components/dash-rotacion/dash-rotacion.component';
import { DashAgotadosComponent } from './components/dash-agotados/dash-agotados.component';
// import { Chart } from 'chart.js'; // importar Chart.js
// import 'chartjs-plugin-datalabels'; // opcional, para habilitar etiquetas de datos en el gráfico

 imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgChartsModule
  ]

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    ProductFormComponent,
    ProductListComponent,
    ViewfullComponent,
    UserFormComponent,
    UserListComponent,
    HomeComponent,
    CategoryFormComponent,
    CategoryListComponent,
    FooterComponent,
    LoginComponent,
    UserInitViewComponent,
    SignUpComponent,
    EmpleadosListComponent,
    EmpleadosFormComponent,
    ProveedoresFormComponent,
    ProveedoresListComponent,
    FacturasFormComponent,
    FacturasListComponent,
    MantenimientoFormComponent,
    MantenimientoListComponent,
    FacturainfoComponent,
    DashboardComponent,
    PruebasComponent,
    DashProductosComponent,
    DashClientesComponent,
    DashMantenimientosComponent,
    DashVentasComponent,
    DashCategoriasComponent,
    DashProdMantenimientosComponent,
    CalificanosComponent,
    DashCalificacionComponent,
    DashRotacionComponent,
    DashAgotadosComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers: [
    ProductosService,
    { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
