import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculoEditPage } from './vehiculo-edit.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculoEditPageRoutingModule {}
