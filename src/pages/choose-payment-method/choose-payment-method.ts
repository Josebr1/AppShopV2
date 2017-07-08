import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormsModule} from "@angular/forms";
import {PaymentFormPage} from "../payment-form/payment-form";

/**
 * Generated class for the ChoosePaymentMethodPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-choose-payment-method',
  templateUrl: 'choose-payment-method.html',
})
export class ChoosePaymentMethodPage {

  private formMethod;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosePaymentMethodPage');
  }

  onClickPaymentNext() {
    if (this.formMethod == null) {
      this.showAlert('Atenção', 'Escolha uma forma de Pagamento')
    } else {
      if (this.formMethod == 'CREDIT_ONLINE') {
        console.log(this.formMethod);
        this.navCtrl.push(PaymentFormPage, {
          zipCode: this.navParams.get('zipCode'),
          formPayment: 'CREDIT_ONLINE',
          description: 'Pagamento online'
        });
      } else {
        console.log(this.formMethod);
        this.navCtrl.push(PaymentFormPage, {
          zipCode: this.navParams.get('zipCode'),
          formPayment: 'PAYMENT_ON_TIME',
          description: 'Forma de pagamento na entrega: ' + this.getPaymentMethod()
        });
      }
    }
  }

  showAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  private getPaymentMethod() {
    if (this.formMethod == 'PAYMENT_ON_TIME_CREDIT') {
      return 'Cartão de crédito';
    }
    if (this.formMethod == 'PAYMENT_ON_TIME_DEBIT') {
      return 'Cartão de débito';
    }
    if(this.formMethod == 'PAYMENT_ON_TIME_MONEY'){
      return 'Dinheiro';
    }
  }

}
