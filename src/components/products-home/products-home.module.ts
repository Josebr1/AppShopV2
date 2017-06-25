import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsHomeComponent } from './products-home';

@NgModule({
  declarations: [
    ProductsHomeComponent,
  ],
  imports: [
    IonicPageModule.forChild(ProductsHomeComponent),
  ],
  exports: [
    ProductsHomeComponent
  ]
})
export class ProductsHomeComponentModule {}
