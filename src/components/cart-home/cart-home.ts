import { Component } from '@angular/core';
import {AlertController, App, NavController, NavParams} from "ionic-angular";
import {SharedCartServiceProvider} from "../../providers/shared-cart-service/shared-cart-service";
import {VerifyZipCodePage} from "../../pages/verify-zip-code/verify-zip-code";

/**
 * Generated class for the CartHomeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cart-home',
  templateUrl: 'cart-home.html'
})
export class CartHomeComponent {

  cartItems: Array<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cart: SharedCartServiceProvider,
              private app: App,
              public alertCtrl: AlertController) {
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
    if(this.cart.totalAquantity <= 0){
      this.showAlert("Atenção", "Carrinho de compras vazio")
    }else{
      this.app.getRootNav().push(VerifyZipCodePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingCartPage');
  }

  showAlert(title:string, msg:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
