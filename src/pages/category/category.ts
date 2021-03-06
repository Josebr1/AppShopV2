import {Component, OnInit} from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {ProductDetailPage} from "../product-detail/product-detail";
import {UrlServeProvider} from "../../providers/url-serve/url-serve";

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage implements OnInit {

  nameCategory = "";
  categoryProducts: Array<any>;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private urlServe: UrlServeProvider,
              private app: App) {
    this.nameCategory = navParams.get('name');
  }

  ngOnInit(): void {
    this.getService();
  }

  getService() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    //let url = "http://web-api.files-app.ga/public/product/category/";
    let idCategory = this.navParams.get('idCategory');
    return this.http.get(this.urlServe.urlProductCategory + idCategory).map(res => res.json()).subscribe(
      data => {
        if (!data) {
          this.showAlert();
          loader.dismiss();
        } else {
          this.categoryProducts = data;
          loader.dismiss();
        }
      },
      err => {
        loader.dismiss();
        this.showAlert();
      }
    );
  }

  doRefresh(refresher) {
    this.getService();
    refresher.complete();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Não foi possível acessar a internet',
      buttons: ['OK']
    });
    alert.present();
  }

  onClickProductDetail(id, name) {
    this.app.getRootNav().push(ProductDetailPage, {
      idProduct: id,
      name: name
    })
  }

  isShow() {
    if (this.categoryProducts == null) {
      return false;
    } else {
      return true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }
}
