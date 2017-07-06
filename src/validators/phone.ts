/**
 * Created by jose on 7/6/17.
 */
import {FormControl} from '@angular/forms';

export class PhoneValidator {

  static isValid(control: FormControl){

    var re = /^\([1-9]{2}\)[2-9][0-9]{3,4}\-[0-9]{4}$/.test(control.value);

    if (re){
      return null;
    }

    return {"invalidEmail": true};
  }

}
