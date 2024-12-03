import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoPdfPage } from './acceso-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: AccesoPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoPdfPageRoutingModule {}
