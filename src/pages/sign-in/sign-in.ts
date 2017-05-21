import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  private details = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onClickSignIn(){
    console.log(this.details.email);
    console.log(this.details.password);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

}
