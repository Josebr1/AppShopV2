import { Component } from '@angular/core';
import {AlertController, App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Http} from "@angular/http";
import {ProductDetailPage} from "../product-detail/product-detail";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private searchValue;
  private getproducts;
  private searchForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private app: App,
              private formBuilder: FormBuilder) {

    this.searchForm = this.formBuilder.group({
      searchValue: ['', Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getService() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    let url = "http://web-api.files-app.ga/public/product/name/" + this.searchValue;
    return this.http.get(url).map(res => res.json()).subscribe(
      data => {
        if (data == "product not folder") {
          //this.showAlert();
          loader.dismiss();
          console.log('404');
        } else {
          //this.categoryProducts = data;
          this.getproducts = data;
          loader.dismiss();
        }
      },
      err => {
        loader.dismiss();
       this.showAlert('Produto não encontrado!');
        console.log('404');
      }
    );
  }

  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  onClickProductDetail(id, name){
    this.app.getRootNav().push(ProductDetailPage, {
      idProduct: id,
      name: name
    })
  }

}
