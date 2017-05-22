import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, AlertController, App} from 'ionic-angular';
import {ServiceProvider} from "../../providers/service/service";
import {Http} from "@angular/http";
import {CategoryPage} from "../category/category";

@IonicPage()
@Component({
  selector: 'page-all-categories',
  templateUrl: 'all-categories.html',
})
export class AllCategoriesPage implements OnInit {


  allCategories: Array<any>;

  constructor(public service: ServiceProvider,
              private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private app: App) {
  }

  ngOnInit(): void {
    this.getService();
    console.log(this.allCategories);
  }

  getService() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    let url = "http://localhost:8000/category";
    return this.http.get(url).map(res => res.json()).subscribe(
      data => {
        if (!data) {
          this.showAlert();
          loader.dismiss();
        } else {
          this.allCategories = data;
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
    this.getService();
    refresher.complete();
  }

  onClickCategory(id, name) {
    console.log(id, name);
    this.app.getRootNav().push(CategoryPage, {
      idCategory: id,
      name: name
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllCategoriesPage');
  }
}
