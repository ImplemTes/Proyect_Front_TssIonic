import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home/clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesPageModule)
  },
  {
    path: 'home/usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  /*
  {
    path: 'home/ajustes',
    loadChildren: () => import('./ajustes/ajustes.module').then(m => m.AjustesPageModule) // Asegúrate de tener el módulo Ajustes
  },*/
  {
    path: '',
    redirectTo: 'login', //home
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./pages/proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
