import {Component, OnInit} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
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
export class ShoppingCartPage implements OnInit {
  cartItems: Array<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cart: SharedCartServiceProvider,
              private app: App) {
  }

  ngOnInit(): void {
    this.cartItems = this.cart.cart;
  }

  incrementProduct(id) {
    this.cart.increment(id);
  }

  decrementProduct(id) {
    this.cart.decrement(id);
  }

  onVerifyCode() {
    this.app.getRootNav().push(VerifyZipCodePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

}
