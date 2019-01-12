import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { ViewedProductsProvider } from '../../providers/viewed-products/viewed-products';
import { ProductPage } from '../product/product';
import { ProductScannerProvider } from '../../providers/product-scanner/product-scanner';
import { Toast } from '@ionic-native/toast';

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
    viewedProducts: Product[]

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public viewedProvider: ViewedProductsProvider,
        public productScanner: ProductScannerProvider,
        private toast: Toast,
    ) {
        console.log('constructing HistoryPage')
        // asynchronously update the list of viewedProducts
        this.viewedProvider.updateEvents.flatMap(
            evt => {
                console.log('event from viewedProvider', evt);
                return this.viewedProvider.getAllViewed().map(
                    viewed => this.viewedProducts = viewed)
                }).subscribe();
        console.log('constructed HistoryPage')
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HistoryPage');
    }

    scan() {
        console.log("HistoryPage requests a product scan")
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
    }

    viewProduct(product: Product) {
        console.log("viewing product from history", product);
        this.navCtrl.push(ProductPage, { product: product });
    }
}
