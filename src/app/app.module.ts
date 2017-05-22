import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import { HttpModule } from '@angular/http';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SignInPage} from "../pages/sign-in/sign-in";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {TabsPage} from "../pages/tabs/tabs";
import {AllCategoriesPage} from "../pages/all-categories/all-categories";
import { ServiceProvider } from '../providers/service/service';
import {CategoryPage} from "../pages/category/category";
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import { SharedCartServiceProvider } from '../providers/shared-cart-service/shared-cart-service';

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
    TabsPage,
    AllCategoriesPage,
    CategoryPage,
    ProductDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignInPage,
    SignUpPage,
    TabsPage,
    AllCategoriesPage,
    CategoryPage,
    ProductDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    SharedCartServiceProvider
  ]
})
export class AppModule {
}
