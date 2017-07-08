import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoosePaymentMethodPage } from './choose-payment-method';

@NgModule({
  declarations: [
    ChoosePaymentMethodPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoosePaymentMethodPage),
  ],
  exports: [
    ChoosePaymentMethodPage
  ]
})
export class ChoosePaymentMethodPageModule {}
