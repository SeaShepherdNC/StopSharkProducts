import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

import { DataServiceProvider } from '../../providers/data-service/data-service';
// TODO: Vhen is merging with feat-products
//import { ProductPage } from '../product/product';
import { Product } from '../../models/products';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
                private barcodeScanner: BarcodeScanner,
                private toast: Toast,
                public dataService: DataServiceProvider) {}

    scan() {
        // Mock
        /*this.dataService.getProduct("737628064502")
            .subscribe((p) => {
                this.navController.push(ProductPage, {product : p});
            });*/

        this.barcodeScanner.scan().then((barcodeData) => {
            this.dataService.getProduct(barcodeData.text)
                .subscribe((p) => {
                    // TODO: Vhen is merging with feat-products
                    //this.navController.push(ProductPage, {product : p});
                    console.log(p)
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

