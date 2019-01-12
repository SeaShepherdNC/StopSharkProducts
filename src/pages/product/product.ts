import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { HistoryPage } from '../history/history';
import { ProductScannerProvider } from '../../providers/product-scanner/product-scanner';
import { ViewedProductsProvider } from '../../providers/viewed-products/viewed-products';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
    selector: 'page-product',
    templateUrl: 'product.html',
})
export class ProductPage {

    product: Product;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public productScanner: ProductScannerProvider,
        public viewedProvider: ViewedProductsProvider,
        private toast: Toast,
        ) {
        this.product = this.navParams.get('product');
        console.log({ 'ProductPage constructor displaying product': this.product });
    }

    navToHistory() {
        console.log('navToHistory');
        this.navCtrl.popTo(HistoryPage);
        //this.navCtrl.push(HistoryPage)
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductPage');
    }


    navToScan() {
        console.log('todo : navToScan');
        this.productScanner.scan().subscribe((p) => {
            console.log('got product', p)
            this.viewedProvider.addViewed(p);
        }, (err) => {
            console.error(err);
            this.toast.show(err, '5000', 'center').subscribe(
                toast => {
                    console.log(toast);
                }
            );
        })

        this.navCtrl.push(HistoryPage, { doScan: true });
        //this.navCtrl.push(ScanPage)
    }


}
