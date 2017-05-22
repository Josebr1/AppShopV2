import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";

@Injectable()
export class ServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

  getMethod(url: string){

  }

}
