import { Injectable } from '@angular/core';
import { ViewedProductsProvider } from '../viewed-products/viewed-products';
import { DataServiceProvider } from '../data-service/data-service';
import { Toast } from '@ionic-native/toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NavController } from 'ionic-angular';
import { ProductPage } from '../../pages/product/product';
import { Observable } from 'rxjs/Rx';
import { Product } from '../../models/product';

/*
  Generated class for the ProductScannerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductScannerProvider {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    private dataService: DataServiceProvider,
    private viewedProvider: ViewedProductsProvider,
    private navCtrl: NavController,
  ) {
    console.log('Hello ProductScannerProvider Provider');
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


    // TODO : product scanner should not navigate to a page by its own
    this.barcodeScanner.scan().then((barcodeData) => {
      Observable.merge(
        this.dataService.getFoodProduct(barcodeData.text),
        this.dataService.getBeautyProduct(barcodeData.text),
        2)
        .timeout(4000)
        .filter(p => p.exist)
        .first()
        .subscribe((p) => {
          console.log('got produt', p)
          this.viewedProvider.addViewed(p);
          this.navCtrl.push(ProductPage, { product: p });
        }, (err) => {
          console.error(err);
          this.toast.show(err, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        })
    });
  }

}
