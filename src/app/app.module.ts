import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {HttpModule} from '@angular/http';
import {AppMaskerModule} from 'brmasker-ionic';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SignInPage} from "../pages/sign-in/sign-in";
import {SignUpPage} from "../pages/sign-up/sign-up";
import {TabsPage} from "../pages/tabs/tabs";
import {AllCategoriesPage} from "../pages/all-categories/all-categories";
import {ServiceProvider} from '../providers/service/service';
import {CategoryPage} from "../pages/category/category";
import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {SharedCartServiceProvider} from '../providers/shared-cart-service/shared-cart-service';
import {ShoppingCartPage} from "../pages/shopping-cart/shopping-cart";
import {VerifyZipCodePage} from "../pages/verify-zip-code/verify-zip-code";
import {UserUtilProvider} from '../providers/user-util/user-util';
import {Toast} from "@ionic-native/toast";
import {IonicStorageModule} from '@ionic/storage';
import { ProductsHomeComponent } from '../components/products-home/products-home';
import { CartHomeComponent } from '../components/cart-home/cart-home';
import { CartNullHomeComponent } from '../components/cart-null-home/cart-null-home';
import {UserPage} from "../pages/user/user";
import { NotNetworkingComponent } from '../components/not-networking/not-networking';
import {PasswordResetPage} from "../pages/password-reset/password-reset";
import {ComfirmPasswordResetPage} from "../pages/comfirm-password-reset/comfirm-password-reset";
import {ChoosePaymentMethodPage} from "../pages/choose-payment-method/choose-payment-method";
import {PaymentFormPage} from "../pages/payment-form/payment-form";
import { PaymentFormOnlineComponent } from '../components/payment-form-online/payment-form-online';
import { PaymentFormDeliveryComponent } from '../components/payment-form-delivery/payment-form-delivery';
import {OrderHistoryPage} from "../pages/order-history/order-history";
import {SearchPage} from "../pages/search/search";
import { UrlServeProvider } from '../providers/url-serve/url-serve';
import { MaskDirective } from '../directives/mask/mask';

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
    ProductDetailPage,
    ShoppingCartPage,
    VerifyZipCodePage,
    ProductsHomeComponent,
    CartHomeComponent,
    CartNullHomeComponent,
    UserPage,
    NotNetworkingComponent,
    PasswordResetPage,
    ComfirmPasswordResetPage,
    ChoosePaymentMethodPage,
    PaymentFormPage,
    PaymentFormOnlineComponent,
    PaymentFormDeliveryComponent,
    OrderHistoryPage,
    SearchPage,
    MaskDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppMaskerModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
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
    ProductDetailPage,
    ShoppingCartPage,
    VerifyZipCodePage,
    UserPage,
    PasswordResetPage,
    ComfirmPasswordResetPage,
    ChoosePaymentMethodPage,
    PaymentFormPage,
    OrderHistoryPage,
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider,
    SharedCartServiceProvider,
    UserUtilProvider,
    UrlServeProvider,
    MaskDirective,
  ]
})
export class AppModule {
}
