import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotNetworkingComponent } from './not-networking';

@NgModule({
  declarations: [
    NotNetworkingComponent,
  ],
  imports: [
    IonicPageModule.forChild(NotNetworkingComponent),
  ],
  exports: [
    NotNetworkingComponent
  ]
})
export class NotNetworkingComponentModule {}
