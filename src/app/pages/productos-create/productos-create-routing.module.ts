import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosCreatePage } from './productos-create.page';

const routes: Routes = [
  {
    path: '',
    component: ProductosCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosCreatePageRoutingModule {}
