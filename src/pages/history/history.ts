import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { ViewedProductsProvider } from '../../providers/viewed-products/viewed-products';
import { ProductPage } from '../product/product';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  viewedProducts : Product[]

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewedProvider : ViewedProductsProvider) {
      // asynchronously update the list of viewedProducts
      this.viewedProvider.getAllViewed().then(viewed => {
        this.viewedProducts = viewed;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  viewProduct(product : Product){
    console.log("viewing product from history", product);
    this.navCtrl.push(ProductPage, { product: product});
  }

}
