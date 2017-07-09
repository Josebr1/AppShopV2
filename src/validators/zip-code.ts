/**
 * Created by jose on 7/9/17.
 */
/**
 * Created by jose on 7/6/17.
 */
import {FormControl} from '@angular/forms';

export class ZipCodeValidator {

  static isValid(control: FormControl){

    var re = /^\d{5}-\d{3}$/.test(control.value);

    if (re){
      return null;
    }

    return {"invalidEmail": true};
  }

}
