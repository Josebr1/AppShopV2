import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment-form',
  templateUrl: 'payment-form.html',
})
export class PaymentFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentFormPage');
  }

  isShow(){
    if(this.navParams.get('formPayment') == 'CREDIT_ONLINE'){
      return true;
    }else{
      return false;
    }
  }
}
