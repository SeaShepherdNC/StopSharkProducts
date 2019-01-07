import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { ViewedProductsProvider } from '../../providers/viewed-products/viewed-products';
import { ProductPage } from '../product/product';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
        private barcodeScanner: BarcodeScanner,
        private toast: Toast,
        public dataService: DataServiceProvider,
        public viewedProvider: ViewedProductsProvider) {

        // dirty hook to allow scanning directly when going to this page
        if (this.navParams.get('doScan')) {
            this.scan();
        }
        // asynchronously update the list of viewedProducts
        this.viewedProvider.getAllViewed().then(viewed => {
            this.viewedProducts = viewed;
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HistoryPage');
    }

    viewProduct(product: Product) {
        console.log("viewing product from history", product);
        this.navCtrl.push(ProductPage, { product: product });
    }

    scan() {
        // Mock
        // this.dataService.getFoodProduct("737628064502")
        //     .subscribe((p) => {
        //         if (p.exist) {
        //             this.viewedProvider.addViewed(p);
        //             this.navCtrl.push(ProductPage, { product: p });
        //             console.log("warning: Using test food mock")
        //         }
        //     });
        // this.dataService.getBeautyProduct("737628064502")
        //     .subscribe((p) => {
        //         if (p.exist) {
        //             this.viewedProvider.addViewed(p);
        //             this.navCtrl.push(ProductPage, { product: p });
        //             console.log("warning: Using test beauty mock")
        //         }
        //     });


        this.barcodeScanner.scan().then((barcodeData) => {
            this.dataService.getFoodProduct(barcodeData.text)
                .subscribe((p) => {
                    if (p.exist) {
                        this.viewedProvider.addViewed(p);
                        this.navCtrl.push(ProductPage, { product: p });
                    }
                });

            this.dataService.getBeautyProduct(barcodeData.text)
                .subscribe((p) => {
                    if (p.exist) {
                        this.viewedProvider.addViewed(p);
                        this.navCtrl.push(ProductPage, { product: p });
                    }
                });
        }, (err) => {
            this.toast.show(err, '5000', 'center').subscribe(
                toast => {
                    console.log(toast);
                }
            );
        });
    }

}
