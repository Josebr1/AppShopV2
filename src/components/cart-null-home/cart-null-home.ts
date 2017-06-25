import { Component } from '@angular/core';

/**
 * Generated class for the CartNullHomeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cart-null-home',
  templateUrl: 'cart-null-home.html'
})
export class CartNullHomeComponent {

  text: string;

  constructor() {
    console.log('Hello CartNullHomeComponent Component');
    this.text = 'Hello World';
  }

}
