import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController} from 'ionic-angular';
import {SignUpPage} from "../sign-up/sign-up";
import {Auth, User} from '@ionic/cloud-angular';
import {IDetailedError} from "@ionic/cloud/dist/es5";
import {UserUtilProvider} from "../../providers/user-util/user-util";
import {Toast} from '@ionic-native/toast';
import {Http} from "@angular/http";
import {TabsPage} from "../tabs/tabs";

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
  private linkAddUser = "http://localhost:8000/user";

  constructor(public navCtrl: NavController,
              public auth: Auth,
              public user: User,
              private toast: Toast,
              private userUtil: UserUtilProvider,
              private http: Http,
              private loadingCtrl: LoadingController) {
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
      var data = JSON.stringify({
        id_user: this.user.social.facebook.uid,
        name: this.user.social.facebook.data.full_name,
        email: this.user.social.facebook.data.email,
        photo_url: this.user.social.facebook.data.profile_picture
      });

      this.http.post(this.linkAddUser, data).subscribe(data => {
        console.log(data);
        this.userUtil.save(this.user.social.facebook.uid, this.user.social.facebook.data.full_name, this.user.social.facebook.data.email);
        console.log("Usuario cadastrado com sucesso");
        this.navCtrl.setRoot(TabsPage);
      }, error => {
        console.log("Erro ao cadastrar usuario" + error);
      });

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
}
