import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculoCreatePage } from './vehiculo-create.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculoCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculoCreatePageRoutingModule {}
