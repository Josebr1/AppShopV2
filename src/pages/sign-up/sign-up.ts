import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import {Http} from "@angular/http";

/**
 * Generated class for the SignUpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private detailsRegister = {
    userName: "",
    fullName: "",
    tel: "",
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private  auth: Auth,
      private user: User,
      private http: Http) {
  }

  onClickSignUpAccountIonic(){
    let details: UserDetails = {'email': this.detailsRegister.email, 'password': this.detailsRegister.password};

    this.auth.signup(details).then(() => {
      let url = "http://localhost:8000/user";
       this.http.post(url, {'email': this.detailsRegister.email}).map(res => res.json()).subscribe(
        data => {
          console.log(data);
        },
        err => {
            console.log(err);
        }
      );
    }, (err: IDetailedError<string[]>) => {
      for(let e of err.details){
        if (e === 'conflict_email') {
          alert('Email already exists.');
        } else {
          // handle other errors
        }
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
