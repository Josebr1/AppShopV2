import {Component, OnInit} from '@angular/core';
import {IonicPage, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AllCategoriesPage} from "../all-categories/all-categories";
import {SharedCartServiceProvider} from "../../providers/shared-cart-service/shared-cart-service";
import {ShoppingCartPage} from "../shopping-cart/shopping-cart";
import {UserPage} from "../user/user";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage implements OnInit{

  isAndroid: boolean = false;
  totalItemsCart = 0;

  constructor(platform: Platform, private cart:SharedCartServiceProvider) {
    this.isAndroid = platform.is('android');

  }

  tabHome = HomePage;
  tabList = AllCategoriesPage;
  tabCart = ShoppingCartPage;
  tabUser = UserPage;

  ngOnInit(): void {

  }
}
