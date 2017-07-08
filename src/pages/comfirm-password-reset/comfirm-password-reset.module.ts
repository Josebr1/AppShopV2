import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComfirmPasswordResetPage } from './comfirm-password-reset';

@NgModule({
  declarations: [
    ComfirmPasswordResetPage,
  ],
  imports: [
    IonicPageModule.forChild(ComfirmPasswordResetPage),
  ],
  exports: [
    ComfirmPasswordResetPage
  ]
})
export class ComfirmPasswordResetPageModule {}
