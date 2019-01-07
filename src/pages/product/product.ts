import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { HistoryPage } from '../history/history';

@IonicPage()
@Component({
    selector: 'page-product',
    templateUrl: 'product.html',
})
export class ProductPage {

    product: Product;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.product = this.navParams.get('product');
        console.log({ 'ProductPage constructor displaying product': this.product });
    }

    navToHistory() {
        console.log('todo : navToHistory');
        this.navCtrl.push(HistoryPage);
        //this.navCtrl.push(HistoryPage)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductPage');
    }


    navToScan() {
        console.log('todo : navToScan');
        this.navCtrl.push(HistoryPage, { doScan: true });
        //this.navCtrl.push(ScanPage)
    }


}
