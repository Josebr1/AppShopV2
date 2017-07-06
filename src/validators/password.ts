import {FormControl} from '@angular/forms';

export class PasswordValidator {

  static isValid(control: FormControl){

    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(control.value);

    if (re){
      return null;
    }

    return {"invalidEmail": true};
  }

}
