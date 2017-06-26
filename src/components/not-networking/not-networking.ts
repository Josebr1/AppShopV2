import { Component } from '@angular/core';

/**
 * Generated class for the NotNetworkingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'not-networking',
  templateUrl: 'not-networking.html'
})
export class NotNetworkingComponent {

  text: string;

  constructor() {
    console.log('Hello NotNetworkingComponent Component');
    this.text = 'Not Networking';
  }

}
