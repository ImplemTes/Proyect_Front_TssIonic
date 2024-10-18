import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage, // Componente principal que contiene el menú
    children: [
      {
        path: 'inicio',
        component: HomePage // Asegúrate de tener un componente para la vista de inicio
      },
      {
        path: 'home/clientes',
        loadChildren: () => import('../pages/clientes/clientes.module').then(m => m.ClientesPageModule)
      },
      {
        path: 'home/proveedores',
        loadChildren: () => import('../pages/proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
      },
      {
        path: 'home/almacenes',
        loadChildren: () => import('../pages/almacenes/almacenes.module').then( m => m.AlmacenesPageModule)
      },
      {
        path: 'home/vehiculos',
        loadChildren: () => import('../pages/vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
      },
      {
        path: 'home/roles',
        loadChildren: () => import('../pages/roles/roles.module').then( m => m.RolesPageModule)
      },
      {
        path: 'home/productos',
        loadChildren: () => import('../pages/productos/productos.module').then( m => m.ProductosPageModule)
      },




    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
