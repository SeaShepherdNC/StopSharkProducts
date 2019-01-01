import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  product : Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product');
    console.log({'ProductPage constructor displaying product' : this.product});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  navToHistory(){
    console.log('todo : navToHistory');
    //this.navCtrl.push(HistoryPage)
  }

  navToScan(){
    console.log('todo : navToScan');
    //this.navCtrl.push(ScanPage)
  }



}
