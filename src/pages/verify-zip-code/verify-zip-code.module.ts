import {NgModule} from '@angular/core';
import {Directive} from 'ionic2-text-mask'
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
