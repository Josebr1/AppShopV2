import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllCategoriesPage } from './all-categories';

@NgModule({
  declarations: [
    AllCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllCategoriesPage),
  ],
  exports: [
    AllCategoriesPage
  ]
})
export class AllCategoriesPageModule {}
