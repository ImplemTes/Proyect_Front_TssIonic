import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlaccesoCreatePage } from './controlacceso-create.page';

const routes: Routes = [
  {
    path: '',
    component: ControlaccesoCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlaccesoCreatePageRoutingModule {}
