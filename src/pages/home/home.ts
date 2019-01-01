import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

    products: any[] = [];
    selectedProduct: any;
    productFound: boolean = false;

    constructor(public navCtrl: NavController,
        private barcodeScanner: BarcodeScanner,
        private toast: Toast,
        public dataService: DataServiceProvider) {
        this.dataService.getProducts()
            .subscribe((response) => {
                this.products = response
                console.log(this.products);
            });
    }

    navToProduct() {
        let fakeProduct = new Product("test", false, ["beurk"], "https://static.openfoodfacts.org/images/products/324/541/381/2322/front_fr.11.400.jpg");
        this.navCtrl.push(ProductPage, {product : fakeProduct})
    }

    scan() {
        this.selectedProduct = {};
        this.barcodeScanner.scan().then((barcodeData) => {
            this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
            if (this.selectedProduct !== undefined) {
                this.productFound = true;
                console.log(this.selectedProduct);
            } else {
                this.selectedProduct = {};
                this.productFound = false;
                this.toast.show('Product not found', '5000', 'center').subscribe(
                    toast => {
                        console.log(toast);
                    }
                );
            }
        }, (err) => {
            this.toast.show(err, '5000', 'center').subscribe(
                toast => {
                    console.log(toast);
                }
            );
        });
    }

}
