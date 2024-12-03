import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home/clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(m => m.ClientesPageModule)
  },
  {
    path: 'home/usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'home/proveedores',
    loadChildren: () => import('./pages/proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },
  {
    path: 'home/almacenes',
    loadChildren: () => import('./pages/almacenes/almacenes.module').then( m => m.AlmacenesPageModule)
  },
  {
    path: 'home/roles',
    loadChildren: () => import('./pages/roles/roles.module').then( m => m.RolesPageModule)
  },
  {
    path: 'home/productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'home/productos-create',
    loadChildren: () => import('./pages/productos-create/productos-create.module').then( m => m.ProductosCreatePageModule)
  },
  {
    path: 'home/productos-edit/edit/:id',
    loadChildren: () => import('./pages/productos-edit/productos-edit.module').then( m => m.ProductosEditPageModule)
  },
  {
    path: 'home/abastecimiento',
    loadChildren: () => import('./pages/abastecimiento/abastecimiento.module').then( m => m.AbastecimientoPageModule)
  },
  {
    path: 'home/chatbot',
    loadChildren: () => import('./pages/chatbot/chatbot.module').then( m => m.ChatbotPageModule)
  },
  {
    path: 'home/vehiculos',
    loadChildren: () => import('./pages/vehiculos/vehiculos.module').then( m => m.VehiculosPageModule)
  },
  {
    path: 'home/vehiculo-create',
    loadChildren: () => import('./pages/vehiculo-create/vehiculo-create.module').then( m => m.VehiculoCreatePageModule)
  },

  {
    path: 'home/programaciones',
    loadChildren: () => import('./pages/programaciones/programaciones.module').then( m => m.ProgramacionesPageModule)
  },
  {
    path: 'home/controlacceso',
    loadChildren: () => import('./pages/controlacceso/controlacceso.module').then( m => m.ControlaccesoPageModule)
  },
  {
    path: 'home/controlacceso-create',
    loadChildren: () => import('./pages/controlacceso-create/controlacceso-create.module').then( m => m.ControlaccesoCreatePageModule)
  },

  {
    path: 'home/informes',
    loadChildren: () => import('./pages/informes/informes.module').then( m => m.InformesPageModule)
  },
  /*
  {
    path: 'home/ajustes',
    loadChildren: () => import('./ajustes/ajustes.module').then(m => m.AjustesPageModule) // Asegúrate de tener el módulo Ajustes
  },
  */

  
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
    path: 'controlacceso-create',
    loadChildren: () => import('./pages/controlacceso-create/controlacceso-create.module').then( m => m.ControlaccesoCreatePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
