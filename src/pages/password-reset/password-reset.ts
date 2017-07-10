import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';
import {Auth} from "@ionic/cloud-angular";
import {ComfirmPasswordResetPage} from "../comfirm-password-reset/comfirm-password-reset";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/email";

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage implements OnInit {

  email: string;
  private resetPassword: FormGroup;

  ngOnInit(): void {

  }

  constructor(public navCtrl: NavController,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private formBuilder: FormBuilder,
              private auth: Auth) {

    this.resetPassword = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), EmailValidator.isValid])]
    });

  }

  onClickResetPassword() {
    let loader = this.loadingCtrl.create({
      content: "Carregando...",
    });
    loader.present();

    this.auth.requestPasswordReset(this.email).then(
      () => {
        loader.dismiss();
        this.showAlert('Enviamos um email para o seguinte endereço ' + this.email);
        this.navCtrl.push(ComfirmPasswordResetPage);
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
    console.log('ionViewDidLoad PasswordResetPage');
  }

}
