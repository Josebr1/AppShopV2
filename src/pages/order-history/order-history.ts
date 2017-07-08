import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {SignInPage} from "../sign-in/sign-in";
import {User} from "@ionic/cloud-angular";

/**
 * Generated class for the OrderHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-history',
  templateUrl: 'order-history.html',
})
export class OrderHistoryPage implements OnInit {


  private data: Array<any>;

  ngOnInit(): void {
    let loader = this.loadingCtrl.create({
      content: "Carregado...",
    });
    loader.present();

    var userId = this.user.details.username != null ? this.user.details.username : this.user.social.facebook.uid;

    console.log(userId);

    this.http.get('http://web-api.files-app.ga/public/order/products/orders/' + userId).map(res => res.json()).subscribe(
      data => {
        console.log(data);
        loader.dismiss();
        this.data = data;
      },
      err => {
        loader.dismiss();
        console.log(err);
        //this.showAlert('Erro ao cadastrar usuário');
      }
    );

  }

  constructor(public navCtrl: NavController,
              private http: Http,
              private user: User,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderHistoryPage');
  }


}
