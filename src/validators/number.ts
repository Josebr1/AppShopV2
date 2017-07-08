/**
 * Created by jose on 7/7/17.
 */
import {FormControl} from '@angular/forms';

export class NumberValidator {

  static isValid(control: FormControl){

    var re = /^[0-9]+$/.test(control.value);

    if (re){
      return null;
    }

    return {"invalidNumber": true};
  }

}
