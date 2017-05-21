import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SignInPage} from "../pages/sign-in/sign-in";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {TabsPage} from "../pages/tabs/tabs";
import {AllCategoriesPage} from "../pages/all-categories/all-categories";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '7cdb35c1'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignInPage,
    SignUpPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    SignUpPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
