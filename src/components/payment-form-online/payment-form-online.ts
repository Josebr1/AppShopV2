import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from "ionic-angular";
import {SharedCartServiceProvider} from "../../providers/shared-cart-service/shared-cart-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Auth, User} from "@ionic/cloud-angular";
import {Http} from "@angular/http";
import {NumberValidator} from "../../validators/number";
import {TabsPage} from "../../pages/tabs/tabs";
import {splitAtColon} from "@angular/compiler/src/util";
import {UrlServeProvider} from "../../providers/url-serve/url-serve";

/**
 * Generated class for the PaymentFormOnlineComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

declare var PagarMe;

@Component({
  selector: 'payment-form-online',
  templateUrl: 'payment-form-online.html'
})
export class PaymentFormOnlineComponent {

  private finishPayment: FormGroup;
  private shoppingCart;

  private details = {
    street: '',
    number: '',
    neighborhood: '',
    code: ''
  };

  private card = {
    numberCard: '',
    name: '',
    month: '',
    year: '',
    cvv: ''
  };

  private loader;

  constructor(private http: Http,
              private user: User,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private urlServe:UrlServeProvider,
              public cart: SharedCartServiceProvider,
              public navCtrl: NavController,
              public navParams: NavParams) {
    console.log('Hello PaymentFormOnlineComponent Component');

    this.finishPayment = this.formBuilder.group({
      street: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      number: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
      neighborhood: ['', Validators.required],
      code: ['', Validators.compose([Validators.required, Validators.minLength(3)])],

      numberCard: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvv: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
    });
  }

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

  private pagarmeHash() {
    PagarMe.encryption_key = "ek_test_cjcVOAPtjFTgBSpE4AoJoJFl9DUSya";
    var creditCard = new PagarMe.creditCard();
    creditCard.cardHolderName = this.card.name;
    creditCard.cardExpirationMonth = this.card.month.substring(2, 4);
    creditCard.cardExpirationYear = this.card.year;
    creditCard.cardNumber = this.card.numberCard;
    creditCard.cardCVV = this.card.cvv;

    console.log(this.card);

    this.loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loader.present();

    var fieldErrors = creditCard.fieldErrors();
    var errors = [], i = 0;
    for (var field in fieldErrors) {
      errors[i++] = field;
    }

    if (errors.length > 0) {
      this.loader.dismiss();
      this.showAlert('' + errors);
    } else {
      creditCard.generateHash(cardHash => {
        console.log(cardHash);
        if (cardHash != null) {
          this.payment(cardHash);
        }
      });
    }
  }

  showAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }


  private payment(token) {
    if (this.details.number != null) {
      let items = [];
      for (var i = 0; i < this.cart.cart.length; i++) {
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
        token_card: token
      };

      this.http.post(this.urlServe.urlPayment, params).map(res => res.json()).subscribe(
        data => {
          console.log(data);
          this.cart.clear();
          this.loader.dismiss();
          this.showAlert('Pedido realizado com sucesso!');
          this.cart.clear();
          this.navCtrl.setRoot(TabsPage);
        },
        err => {
          this.loader.dismiss();
          console.log(err);
          this.showAlert('Erro ao realizar pedido');
        }
      );
    } else {
      this.showAlert('Preencha o número de entrega');
    }
  }

  onClickFinishPayment() {

    console.log(this.card.month.substring(2, 4));
    console.log(this.card.year);

    this.pagarmeHash();

  }

}
