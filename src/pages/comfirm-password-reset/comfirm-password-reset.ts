import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth} from "@ionic/cloud-angular";
import {SignInPage} from "../sign-in/sign-in";
import {PasswordValidator} from "../../validators/password";
import {NumberValidator} from "../../validators/number";

@IonicPage()
@Component({
  selector: 'page-comfirm-password-reset',
  templateUrl: 'comfirm-password-reset.html',
})
export class ComfirmPasswordResetPage {


  private code: number;
  private password: string;


  private resetNewPassword: FormGroup;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private auth: Auth) {

    this.resetNewPassword = this.formBuilder.group({
      code: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.required, Validators.maxLength(6), NumberValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.required, PasswordValidator.isValid])]
    });
  }

  onClickNewResetPassword() {

    let loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    loader.present();

    this.auth.confirmPasswordReset(this.code, this.password).then(
      () => {
        loader.dismiss();
        this.showAlert('Senha Alterada com sucesso!');
        this.navCtrl.setRoot(SignInPage);
      }, (err) => {
        loader.dismiss();
      }
    );
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComfirmPasswordResetPage');
  }

}
