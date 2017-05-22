import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";
import {TabsPage} from "../tabs/tabs";
import {Auth, User} from '@ionic/cloud-angular';
import {IDetailedError} from "@ionic/cloud/dist/es5";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: Auth,
              public user: User) {
  }

  onClickSignIn() {
    console.log(this.details.email);
    console.log(this.details.password);
    this.navCtrl.push(TabsPage);
  }

  clickRegister() {
    this.navCtrl.push(SignUpPage);
  }

  onClickSignUp() {

  }

  onCLickFacebook() {

    this.auth.login('facebook').then(() => {

    }, (err: IDetailedError<String[]>) => {

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

}
