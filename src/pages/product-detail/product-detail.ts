import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {SharedCartServiceProvider} from "../../providers/shared-cart-service/shared-cart-service";
import {TabsPage} from "../tabs/tabs";
import {UrlServeProvider} from "../../providers/url-serve/url-serve";

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage implements OnInit {

  productDetails: Array<any>;
  productName = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private urlServe : UrlServeProvider,
              private cart: SharedCartServiceProvider) {
    this.productName = navParams.get('name');
  }

  ngOnInit(): void {
    this.getService(this.urlServe.urlListProductsById, this.navParams.get('idProduct'), "product");
  }

  getService(url, id, object) {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    return this.http.get(url + id).map(res => res.json()).subscribe(
      data => {
        if (!data) {
          this.showAlert();
          loader.dismiss();
        } else {
          if (object == "product") {
            this.productDetails = data;
          }
          loader.dismiss();
        }
      },
      err => {
        loader.dismiss();
        this.showAlert();
      }
    );
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Não foi possível acessar a internet',
      buttons: ['OK']
    });
    alert.present();
  }

  doRefresh(refresher) {
    this.getService(this.urlServe.urlListProductsById, this.navParams.get('idProduct'), "product");
    refresher.complete();
  }

  isShow() {
    if (this.productDetails == null) {
      return false;
    } else {
      return true;
    }
  }


  onClickProductCart(id:number, image:string, name:string, desc:string, price:number, quantity:number) {
    this.cart.addProductCart(id, image, name, desc, price, quantity);
    this.navCtrl.setRoot(TabsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
