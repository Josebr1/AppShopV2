import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {ChoosePaymentMethodPage} from "../choose-payment-method/choose-payment-method";

/**
 * Generated class for the VerifyZipCodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-verify-zip-code',
  templateUrl: 'verify-zip-code.html',
})
export class VerifyZipCodePage {


  cep: string = "";
  statusZip = "";
  isOK = false;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  verifyZipCode() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();
    console.log(this.cep != null);
    let url = "http://maps.googleapis.com/maps/api/distancematrix/json?origins='Etec da zona leste'" + "|&destinations=" + this.cep + "&mode=CAR|&language=PT|&sensor=false";

    return this.http.get(url).map(res => res.json()).subscribe(
      data => {
        console.log(data.rows[0].elements[0].status);
        if (data.rows[0].elements[0].status != "OK") {
          this.showAlert("Atenção", "CEP incorreto");
          loading.dismiss();
        } else {
          console.log(data.rows[0].elements[0].distance.text);
          var kmString = data.rows[0].elements[0].distance.text;
          var km = kmString.replace("km", "");

          if (parseInt(km) <= 10) {
           // this.showAlert("", "");
            this.navCtrl.push(ChoosePaymentMethodPage, {
              zipCode: this.cep
            });
          } else {
            this.showAlert("Atenção", "Infelizmente o endereço de entrega não se encontra no limite especificado :)");
          }
          console.log(km);
          loading.dismiss();
        }
      },
      err => {
        console.log(err + "Não foi possível acessar a internet");
        loading.dismiss();
      }
    );
  }

  showAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyZipCodePage');
  }
}
