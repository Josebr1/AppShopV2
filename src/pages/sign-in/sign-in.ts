import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";
import {Auth, User} from '@ionic/cloud-angular';
import {IDetailedError} from "@ionic/cloud/dist/es5";
import {UserUtilProvider} from "../../providers/user-util/user-util";
import {Toast} from '@ionic-native/toast';
import {Http} from "@angular/http";
import {TabsPage} from "../tabs/tabs";
import {PasswordResetPage} from "../password-reset/password-reset";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";
import {PasswordValidator} from "../../validators/password";
import {UrlServeProvider} from "../../providers/url-serve/url-serve";

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})

export class SignInPage implements OnInit {

  private details = {
    email: "",
    password: ""
  };
  private signIn: FormGroup;

  constructor(private navCtrl: NavController,
              private auth: Auth,
              private user: User,
              private toast: Toast,
              private userUtil: UserUtilProvider,
              private http: Http,
              private urlServe : UrlServeProvider,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {

    this.signIn = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.required, PasswordValidator.isValid])],
    });
  }

  ngOnInit(): void {
    this.details.email = this.navParams.get('email');
  }

  onClickSignIn() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();

    this.auth.login('basic', this.details).then(() => {
      this.userUtil.save(this.user.details.username, this.user.details.name, this.user.details.email);
      this.navCtrl.setRoot(TabsPage);
      loading.dismiss();
    }, (err: IDetailedError<string[]>) => {
      console.error(err);
      this.toast.show('E-Mail ou senha incorretos', '1000', 'center').subscribe(
        toast => {
          console.log(toast);
        });
      loading.dismiss();
    });
  }

  onClickSignUp() {
    this.navCtrl.push(SignUpPage);
  }

  onCLickFacebook() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();

    this.auth.login('facebook').then(() => {
      let loader = this.loadingCtrl.create({
        content: "Carregado...",
      });
      loader.present();

      let data = {
        id_user: this.user.social.facebook.uid,
        name: this.user.social.facebook.data.full_name,
        email: this.user.social.facebook.data.email,
        photo_url: this.user.social.facebook.data.profile_picture
      };

      this.http.post(this.urlServe.urlAddUser, data).map(res => res.json()).subscribe(
        data => {
          console.log(data);
          loader.dismiss();
          this.showAlert('Usuário cadastrado com sucesso!');
          this.navCtrl.setRoot(TabsPage);
        },
        err => {
          loader.dismiss();
          console.log(err);
          this.showAlert('Erro ao cadastrar usuário');
        }
      );
      loading.dismiss();
    }, (err: IDetailedError<String[]>) => {
      console.error(err);
      this.toast.show('Não foi possível realizar o login', '1000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  showAlert(msg:string) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  onClickResetPassword() {
    this.navCtrl.push(PasswordResetPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
}
