import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

/*
 Generated class for the UrlServeProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UrlServeProvider {

  constructor() {
    console.log('Hello UrlServeProvider Provider');
  }

  private _urlServe = "http://web-api.files-app.ga/public/";

  private _urlListCategories = "category";
  private _urlListProducts = "product";
  private _urlAddUser = "user";
  private _urlProductCategory = "product/category/";
  private _urlcategoryHomeSlide = "category/home/slide";
  private _urlorderProductsOrders = "order/products/orders/";
  private _urlProductName = "product/name/";
  private _urlProductHomeProducts = "product/home/products";
  private _urlPayment = "payment";
  private _urlOrder = "order";

  private _urlPhoto = "http://site.files-app.ga/";

  get urlPhoto(): string {
    return this._urlPhoto;
  }

  get urlOrder(): string {
    return this._urlServe + this._urlOrder;
  }

  get urlPayment(): string {
    return this._urlServe + this._urlPayment;
  }

  get urlProductHomeProducts(): string {
    return this._urlServe + this._urlProductHomeProducts;
  }

  get urlProductName(): string {
    return this._urlServe + this._urlProductName;
  }

  get urlorderProductsOrders(): string {
    return this._urlServe + this._urlorderProductsOrders;
  }

  get urlcategoryHomeSlide(): string {
    return this._urlServe + this._urlcategoryHomeSlide;
  }

  get urlProductCategory(): string {
    return this._urlServe + this._urlProductCategory;
  }

  get urlListCategories(): string {
    return this._urlServe + this._urlListCategories;
  }

  get urlListProducts(): string {
    return this._urlServe + this._urlListProducts;
  }

  get urlListProductsById(): string {
    return this._urlServe + this._urlListProducts + "/";
  }


  get urlAddUser(): string {
    return this._urlServe + this._urlAddUser;
  }


}
