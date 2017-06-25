import {Component, OnInit} from '@angular/core';
import {App, IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {SharedCartServiceProvider} from "../../providers/shared-cart-service/shared-cart-service";
import {VerifyZipCodePage} from "../verify-zip-code/verify-zip-code";

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  constructor(public cart: SharedCartServiceProvider) {
  }

  isShow() {
    if (this.cart.totalAquantity > 0) {
      return true;
    } else {
      return false;
    }
  }
}
