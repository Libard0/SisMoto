import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ViewfullComponent } from './components/viewfull/viewfull.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { EmpleadosFormComponent } from './components/empleados-form/empleados-form.component';
import { EmpleadosListComponent } from './components/empleados-list/empleados-list.component';
import { ProveedoresFormComponent } from './components/proveedores-form/proveedores-form.component';
import { ProveedoresListComponent } from './components/proveedores-list/proveedores-list.component';
import { FacturasListComponent } from './components/facturas-list/facturas-list.component';
import { FacturasFormComponent } from './components/facturas-form/facturas-form.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserInitViewComponent } from './components/user-init-view/user-init-view.component';
import { MantenimientoFormComponent } from './components/mantenimiento-form/mantenimiento-form.component';
import { MantenimientoListComponent } from './components/mantenimiento-list/mantenimiento-list.component';
import { FacturainfoComponent } from './components/facturainfo/facturainfo.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashVentasComponent } from './components/dash-ventas/dash-ventas.component';

import { PruebasComponent  } from './components/pruebas/pruebas.component';

const routes: Routes = [
  { path: '', redirectTo: '/UserInit', pathMatch: 'full' }, // '/home'
  { path: 'UserInit', component: UserInitViewComponent }, //
  { path: 'home', component: HomeComponent },
  { path: 'home/viewfull/:id', component: ViewfullComponent },


  { path: 'productos', component: ProductListComponent },
  { path: 'productos/add', component: ProductFormComponent },
  { path: 'productos/edit/:id', component: ProductFormComponent },
  { path: 'productos/viewfull/:id', component: ViewfullComponent },

  { path: 'usuarios', component: UserListComponent },
  { path: 'usuarios/add', component: UserFormComponent },
  { path: 'usuarios/edit/:id', component: UserFormComponent },

  { path: 'categorias', component: CategoryListComponent },
  { path: 'categorias/add', component: CategoryFormComponent },
  { path: 'categorias/edit/:id', component: CategoryFormComponent },

  { path: 'empleados', component: EmpleadosListComponent },
  { path: 'empleados/add', component: EmpleadosFormComponent },
  { path: 'empleados/edit/:id', component: EmpleadosFormComponent },

  { path: 'proveedores', component: ProveedoresListComponent },
  { path: 'proveedores/add', component: ProveedoresFormComponent },
  { path: 'proveedores/edit/:id', component: ProveedoresFormComponent },

  { path: 'facturas', component: FacturasListComponent },
  { path: 'facturas/add', component: FacturasFormComponent },
  { path: 'facturas/edit/:id', component: FacturasFormComponent },
  { path: 'facturas/facturainfo/:id', component: FacturainfoComponent },

  { path: 'logIn', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  // { path: 'signUp', component: UserFormComponent },
  { path: 'Home', component: HomeComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: DashVentasComponent },

  // { path: 'Home/session/:id', component: HomeComponent },

  { path: 'mantenimientos', component: MantenimientoListComponent },
  { path: 'mantenimientos/add', component: MantenimientoFormComponent },
  { path: 'mantenimientos/edit/:id', component: MantenimientoFormComponent },
  // { path: 'Home', component: HomeComponent }

  {path: 'tycppd/:id', component: PruebasComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
