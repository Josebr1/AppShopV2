import {Component, OnInit} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {SignInPage} from "../pages/sign-in/sign-in";
import {ServiceProvider} from "../providers/service/service";
import {SharedCartServiceProvider} from "../providers/shared-cart-service/shared-cart-service";
import {Auth} from "@ionic/cloud-angular";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html',
  providers: [ServiceProvider, SharedCartServiceProvider]
})
export class MyApp implements OnInit{

  rootPage: any;

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.rootPage = TabsPage;
    }else{
      this.rootPage = SignInPage;
    }
  }

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: Auth) {
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

