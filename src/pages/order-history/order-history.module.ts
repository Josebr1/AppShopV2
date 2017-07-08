import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderHistoryPage } from './order-history';

@NgModule({
  declarations: [
    OrderHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderHistoryPage),
  ],
  exports: [
    OrderHistoryPage
  ]
})
export class OrderHistoryPageModule {}
