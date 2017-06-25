import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartNullHomeComponent } from './cart-null-home';

@NgModule({
  declarations: [
    CartNullHomeComponent,
  ],
  imports: [
    IonicPageModule.forChild(CartNullHomeComponent),
  ],
  exports: [
    CartNullHomeComponent
  ]
})
export class CartNullHomeComponentModule {}
