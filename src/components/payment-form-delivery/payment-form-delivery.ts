import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController, NavController, NavParams} from "ionic-angular";
import {Http} from "@angular/http";
import {UserNameValidator} from "../../validators/user-name";
import {PhoneValidator} from "../../validators/phone";
import {EmailValidator} from "../../validators/email";
import {PasswordValidator} from "../../validators/password";
import {NumberValidator} from "../../validators/number";
import {SharedCartServiceProvider} from "../../providers/shared-cart-service/shared-cart-service";
import {Auth, User} from "@ionic/cloud-angular";
import {HomePage} from "../../pages/home/home";
import {TabsPage} from "../../pages/tabs/tabs";

/**
 * Generated class for the PaymentFormDeliveryComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'payment-form-delivery',
  templateUrl: 'payment-form-delivery.html'
})
export class PaymentFormDeliveryComponent implements OnInit{

  text: string;
  private finishPayment: FormGroup;
  private shoppingCart;

  private details = {
    street: '',
    number: '',
    neighborhood: '',
    code: ''
  };

  private urlOrder = "http://web-api.files-app.ga/public/order";

  ngOnInit(): void {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present();

    let url = "https://viacep.com.br/ws/" + this.navParams.get('zipCode') + "/json/";
    this.http.get(url).map(res => res.json()).subscribe(
      data => {
        this.details.street = data.logradouro;
        this.details.neighborhood = data.bairro;
        this.details.code = data.cep;
        loader.dismiss();
      },
      err => {
        loader.dismiss();
        this.showAlert('Não foi possivel carregar o endereço');
      }
    );

    this.shoppingCart = this.cart.cart;
  }

  constructor(private http: Http,
              private auth: Auth,
              private user: User,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              public cart: SharedCartServiceProvider,
              public navCtrl: NavController,
              public navParams: NavParams) {
    console.log('Hello PaymentFormDeliveryComponent Component');

    this.finishPayment = this.formBuilder.group({
      street: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      number: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
      neighborhood: ['', Validators.required],
      code: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }

  showAlert(msg : string) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  onClickFinishPayment(){
    if(this.details.number != null){
      let loader = this.loadingCtrl.create({
        content: "Aguarde...",
      });
      loader.present();

      let items = [];
      for(var i = 0; i < this.cart.cart.length; i++){
        items.push({
          quantity: this.cart.cart[i].cart_item_quantity,
          product_id: this.cart.cart[i].cart_item_id
        });
      }

      var userId = this.user.details.username != null ? this.user.details.username : this.user.social.facebook.uid;

      let params = {
        description_order: this.navParams.get('description'),
        address: this.details.street + ' N°' + this.details.number + ' ' + this.details.neighborhood + ' ' + this.details.code,
        valor_total: this.cart.totalAmount,
        form_payment: this.navParams.get('formPayment'),
        user_id: userId,
        items: items,
        token_card: ''
      };

      this.http.post(this.urlOrder, params).map(res => res.json()).subscribe(
        data => {
          console.log(data);
          this.cart.clear();
          loader.dismiss();
          this.showAlert('Pedido realizado com sucesso!');
          this.navCtrl.setRoot(TabsPage);
        },
        err => {
          loader.dismiss();
          console.log(err);
          this.showAlert('Erro ao realizar pedido');
        }
      );
    }else {
      this.showAlert('Preencha o número de entrega');
    }
  }
}
