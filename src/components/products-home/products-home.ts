import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";
import {AlertController, App, LoadingController} from "ionic-angular";
import {ProductDetailPage} from "../../pages/product-detail/product-detail";

/**
 * Generated class for the ProductsHomeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'products-home',
  templateUrl: 'products-home.html'
})
export class ProductsHomeComponent implements OnInit{

  products: Array<any>;

  constructor(private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private app: App) {
  }

  ngOnInit(): void {

    this.getSlide();

  }

  getSlide(){
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    let url = "http://web-api.files-app.ga/public/product/home/products";
    return this.http.get(url).map(res => res.json()).subscribe(
      data => {
        if (!data) {
          this.showAlert();
          loader.dismiss();
        } else {
          this.products = data;
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

  onClickProductDetail(id, name){
    this.app.getRootNav().push(ProductDetailPage, {
      idProduct: id,
      name: name
    })
  }

}
