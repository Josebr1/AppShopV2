import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {SharedCartServiceProvider} from "../../providers/shared-cart-service/shared-cart-service";

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
