import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartHomeComponent } from './cart-home';

@NgModule({
  declarations: [
    CartHomeComponent,
  ],
  imports: [
    IonicPageModule.forChild(CartHomeComponent),
  ],
  exports: [
    CartHomeComponent
  ]
})
export class CartHomeComponentModule {}
