import {Component} from '@angular/core';
import {IonicPage, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AllCategoriesPage} from "../all-categories/all-categories";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {

  tabHome = HomePage;
  tabList = AllCategoriesPage;

  isAndroid: boolean = false;

  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');
  }
}
