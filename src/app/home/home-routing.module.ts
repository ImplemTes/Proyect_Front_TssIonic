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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
