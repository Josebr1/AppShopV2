/**
 * Created by jose on 7/6/17.
 */
import {FormControl} from '@angular/forms';

export class UserNameValidator {

  static isValid(control: FormControl){

    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(control.value);

    if (re){
      return null;
    }

    return {"invalidEmail": true};
  }

}
