import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {SignInPage} from "../pages/sign-in/sign-in";
import {ServiceProvider} from "../providers/service/service";
import {SharedCartServiceProvider} from "../providers/shared-cart-service/shared-cart-service";

@Component({
  templateUrl: 'app.html',
  providers: [ServiceProvider, SharedCartServiceProvider]
})
export class MyApp {


  rootPage: any = SignInPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /*
   disconnectSubscription = this.network.onDisconnect().subscribe(() => {
   console.log('network was disconnected :-(');
   });*/

}

