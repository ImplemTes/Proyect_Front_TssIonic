import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramacionesPage } from './programaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramacionesPageRoutingModule {}
