import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, App, LoadingController, NavController, Slides} from 'ionic-angular';
import {Http} from "@angular/http";
import {CategoryPage} from "../category/category";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild(Slides) slides: Slides;

  response: Array<any>;

  constructor(public navCtrl: NavController,
              private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private app: App) {
  }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  ngOnInit(): void {
    this.getSlide();
  }

  getSlide() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });

    loader.present();
    let url = "http://localhost:8000/category/home/slide";
    return this.http.get(url).map(res => res.json()).subscribe(
      data => {
        if (!data) {
          this.showAlert();
          loader.dismiss();
        } else {
          this.response = data;
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

  onClickCategory(id, name) {
    console.log(id, name);
    this.app.getRootNav().push(CategoryPage, {
      idCategory: id,
      name: name
    });
  }

}
