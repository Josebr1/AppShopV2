import {Component, OnInit} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {SharedCartServiceProvider} from "../../providers/shared-cart-service/shared-cart-service";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage implements OnInit {

  productDetails: Array<any>;
  productCommentary: Array<any>;
  productName = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private app: App,
              private cart: SharedCartServiceProvider) {
    this.productName = navParams.get('name');
  }

  ngOnInit(): void {
    this.getService("http://localhost:8000/product/", this.navParams.get('idProduct'), "product");
    this.getService("http://localhost:8000/commentary/product/", this.navParams.get('idProduct'), "commentary");
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
          if (object == "commentary") {
            this.productCommentary = data;
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
    this.getService("http://localhost:8000/product/", this.navParams.get('idProduct'), "product");
    this.getService("http://localhost:8000/commentary/product/", this.navParams.get('idProduct'), "commentary");
    refresher.complete();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Comentário',
      inputs: [
        {
          name: 'commentaryText',
          placeholder: 'Deixe sua opinião'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            console.log('Cancel Salvar');
          }
        }
      ]
    });
    alert.present();
  }

  onClickProductCart(id:number, image:string, name:string, desc:string, price:number, quantity:number) {
    this.cart.addProductCart(id, image, name, desc, price, quantity);
    this.navCtrl.push(TabsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
