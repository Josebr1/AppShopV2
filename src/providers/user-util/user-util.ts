import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {Toast} from '@ionic-native/toast';

@Injectable()
export class UserUtilProvider {

  constructor(public http: Http, private storage: Storage, private toast: Toast) {
    console.log('Hello UserUtilProvider Provider');
  }

  save(id: string, name: string, email: string) {
    try {
      this.storage.set('idUser', id);
      this.storage.set('nameUser', name);
      this.storage.set('emailUser', email);
      console.log("saveStorageUser->OK");
    } catch (err) {
      console.log("saveStorageUser->" + err);
      this.toast.show('Error', '1000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
  }

}
