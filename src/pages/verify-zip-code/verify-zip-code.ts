import {Component} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private app: App) {
  }

  verifyZipCode() {
    console.log(this.cep != null);

    if (this.cep.length >= 9) {
      try {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
          origins: [this.cep],
          destinations: ["Etec da zona leste"],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC
        }, this.callback);

        console.log(this.statusZip);

      } catch (err) {

      }
    } else {
      this.showAlert("", "");
    }
  }

  callback(response, status) {
    try{
      var kmString = response.rows[0].elements[0].distance.text;
      var km = kmString.replace("km", "");
      console.log(km);

      if (status != google.maps.DistanceMatrixStatus.OK) {
        console.log("Error");
      } else {
        this.statusZip = km;
        console.log(parseInt(km) <= 10.00);
      }
    }catch (err){

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyZipCodePage');
  }

}
