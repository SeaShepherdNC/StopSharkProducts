import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

import { DataServiceProvider } from '../../providers/data-service/data-service';
import { ProductPage } from '../product/product';
import { Product } from '../../models/product';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private barcodeScanner: BarcodeScanner,
                private toast: Toast,
                public dataService: DataServiceProvider) {
        // dirty hook to allow scanning directly when going to this page
        if (this.navParams.get('doScan')){
            this.scan();
        }
    }

    navToProduct() {
        let fakeProduct = new Product("test", false, ["beurk"], "https://static.openfoodfacts.org/images/products/324/541/381/2322/front_fr.11.400.jpg");
        this.navCtrl.push(ProductPage, {product : fakeProduct})
    }

    scan() {
        // Mock
        // this.dataService.getProduct("737628064502")
        //     .subscribe((p) => {
        //         this.navCtrl.push(ProductPage, {product : p});
        //     });

        this.barcodeScanner.scan().then((barcodeData) => {
            this.dataService.getProduct(barcodeData.text)
                .subscribe((p) => {
                    // display product page
                    this.navCtrl.push(ProductPage, {product : p});
                    console.log(p)
                    // todo add to history
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

