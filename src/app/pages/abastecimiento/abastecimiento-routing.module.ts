import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbastecimientoPage } from './abastecimiento.page';

const routes: Routes = [
  {
    path: '',
    component: AbastecimientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbastecimientoPageRoutingModule {}
