import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentFormDeliveryComponent } from './payment-form-delivery';

@NgModule({
  declarations: [
    PaymentFormDeliveryComponent,
  ],
  imports: [
    IonicPageModule.forChild(PaymentFormDeliveryComponent),
  ],
  exports: [
    PaymentFormDeliveryComponent
  ]
})
export class PaymentFormDeliveryComponentModule {}
