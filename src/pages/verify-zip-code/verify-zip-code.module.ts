import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyZipCodePage } from './verify-zip-code';


@NgModule({
  declarations: [
    VerifyZipCodePage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyZipCodePage),
  ],
  exports: [
    VerifyZipCodePage
  ]
})
export class VerifyZipCodePageModule {}
