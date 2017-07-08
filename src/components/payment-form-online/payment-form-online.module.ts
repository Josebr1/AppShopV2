import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentFormOnlineComponent } from './payment-form-online';

@NgModule({
  declarations: [
    PaymentFormOnlineComponent,
  ],
  imports: [
    IonicPageModule.forChild(PaymentFormOnlineComponent),
  ],
  exports: [
    PaymentFormOnlineComponent
  ]
})
export class PaymentFormOnlineComponentModule {}
