import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { ProductPage } from '../product/product';
import { Product } from '../../models/product';
import { ViewedProductsProvider } from '../../providers/viewed-products/viewed-products';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private barcodeScanner: BarcodeScanner,
        private toast: Toast,
        public dataService: DataServiceProvider,
        public viewedProducts: ViewedProductsProvider,
        ) {
        // dirty hook to allow scanning directly when going to this page
        if (this.navParams.get('doScan')) {
            this.scan();
        }
    }

    scan() {
        // Mock
        // this.dataService.getFoodProduct("737628064502")
        //     .subscribe((p) => {
        //         if (p.exist) {
        //             this.viewedProducts.addViewed(p);
        //             this.navCtrl.push(ProductPage, { product: p });
        //             console.log("warning: Using test food mock")
        //         }
        //     });
        // this.dataService.getBeautyProduct("737628064502")
        //     .subscribe((p) => {
        //         if (p.exist) {
        //             this.viewedProducts.addViewed(p);
        //             this.navCtrl.push(ProductPage, { product: p });
        //             console.log("warning: Using test beauty mock")
        //         }
        //     });


        this.barcodeScanner.scan().then((barcodeData) => {
            this.dataService.getFoodProduct(barcodeData.text)
                .subscribe((p) => {
                    if (p.exist) {
                        this.viewedProducts.addViewed(p);
                        this.navCtrl.push(ProductPage, { product: p });
                    }
                });

            this.dataService.getBeautyProduct(barcodeData.text)
                .subscribe((p) => {
                    if (p.exist) {
                        this.viewedProducts.addViewed(p);
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
