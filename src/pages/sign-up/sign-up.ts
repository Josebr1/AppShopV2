import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {Auth, User, UserDetails, IDetailedError} from '@ionic/cloud-angular';
import {Http} from "@angular/http";
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {EmailValidator} from "../../validators/email";
import {PhoneValidator} from "../../validators/phone";
import {PasswordValidator} from "../../validators/password";
import {UserNameValidator} from "../../validators/user-name";
import {SignInPage} from "../sign-in/sign-in";

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

  private signUp: FormGroup;

  constructor(public navCtrl: NavController,
              private auth: Auth,
              private user: User,
              private http: Http,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder) {


    this.signUp = this.formBuilder.group({
      userName: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(15), UserNameValidator.isValid])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(15)])],
      tel: ['', Validators.compose([PhoneValidator.isValid])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.required, PasswordValidator.isValid])],
    });

  }

  onClickSignUpAccountIonic() {
    let loader = this.loadingCtrl.create({
      content: "Carregado...",
    });
    loader.present();


    let details = {
      'email': this.detailsRegister.email,
      'password': this.detailsRegister.password,
      'name': this.detailsRegister.fullName,
      'username': this.detailsRegister.userName
    };
    let url = "http://web-api.files-app.ga/public/user";
    let params = {
      id_user: this.detailsRegister.userName,
      name: this.detailsRegister.fullName,
      email: this.detailsRegister.email,
      phone: this.detailsRegister.tel
    };

    this.auth.signup(details).then(() => {
      this.http.post(url, params).map(res => res.json()).subscribe(
        data => {
          console.log(data);
          loader.dismiss();
          this.showAlert('Usuário cadastrado com sucesso!');
          this.navCtrl.setRoot(SignInPage, {
            email: this.detailsRegister.email
          });
        },
        err => {
          loader.dismiss();
          console.log(err);
          this.showAlert('Erro ao cadastrar usuário');
        }
      );
    }, (err: IDetailedError<string[]>) => {
      loader.dismiss();
      this.showAlert('Erro ao cadastrar usuário');
    });
  }


  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

}
