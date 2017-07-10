import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {ToastController} from 'ionic-angular';


@Injectable()
export class SharedCartServiceProvider {

  cart = [];
  totalAmount:number = parseFloat('0.00');
  totalAquantity: number = 0;


  constructor(public toastCtrl: ToastController) {

  }

  addProductCart(id:number, image:string, name:string, desc:string, price, quantity:number) {
    if (this.find(id) !== -1) {
      this.presentToast("Produto já se encontra no carrinho de compras ", 1000);
    } else {
      this.cart.push({
        "cart_item_id": id,
        "cart_item_image": image,
        "cart_item_name": name,
        "cart_item_desc": desc,
        "cart_item_price": parseFloat(price),
        "cart_item_quantity": quantity
      });
      this.totalAquantity += 1;
      this.totalAmount += parseFloat(price);
      this.presentToast("Produto adicionado ao carrinho de compras", 1000)
    }
  }

  find(id): number {
    let result = -1;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].cart_item_id === id) {
        result = i;
        break;
      }
    }
    return result;
  }

  drop(id) {
    var temp = this.cart[this.find(id)];
    this.totalAquantity -= temp.cart_item_quantity;
    this.totalAmount -= temp.cart_item_quantity * parseFloat(temp.cart_item_price);
    this.cart.splice(this.find(id), 1);
  }

  increment(id) {
    this.cart[this.find(id)].cart_item_quantity += 1;
    this.totalAquantity += 1;
    this.totalAmount += parseFloat(this.cart[this.find(id)].cart_item_price);
    console.log(this.totalAmount);
  }

  decrement(id) {
    this.totalAquantity -= 1;
    this.totalAmount -= parseFloat(this.cart[this.find(id)].cart_item_price);
    if (this.cart[this.find(id)].cart_item_quantity === 1) {
      this.cart.splice(this.find(id), 1);
    } else {
      this.cart[this.find(id)].cart_item_quantity -= 1;
    }
  }

  clear(){
    // Limpando o carrinho de compras
    this.cart = [];
    this.totalAquantity = 0;
    this.totalAmount = parseFloat('0.0');
  }

  presentToast(msg, temp) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: temp
    });
    toast.present();
  }
}
