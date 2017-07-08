import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Auth, User} from "@ionic/cloud-angular";
import {SignInPage} from "../sign-in/sign-in";
import {OrderHistoryPage} from "../order-history/order-history";

/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit {

  detailsUser = {
    name: '',
    email: '',
    photo: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private  auth: Auth,
              private user: User) {
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');

    if (this.auth.isAuthenticated()) {

      if(this.user.details.username != null){
        this.detailsUser.name = this.user.details.name;
        this.detailsUser.photo = this.user.details.image;
        this.detailsUser.email = this.user.details.email;
        console.log(this.user.details.image);
      }else{
        this.detailsUser.name = this.user.social.facebook.data.full_name;
        this.detailsUser.photo = this.user.social.facebook.data.profile_picture;
        this.detailsUser.email = this.user.social.facebook.data.email;
        console.log(this.user.social.facebook.data.full_name);
      }
    }

  }

  onClickLogout() {
    this.auth.logout();
    this.navCtrl.setRoot(SignInPage);
  }


  onClickOrderHistory(){
    this.navCtrl.push(OrderHistoryPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

}
