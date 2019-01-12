import { Injectable } from '@angular/core';
import { ViewedProductsProvider } from '../viewed-products/viewed-products';
import { DataServiceProvider } from '../data-service/data-service';
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
    private dataService: DataServiceProvider,
    private viewedProvider: ViewedProductsProvider,
  ) {
    console.log('Hello ProductScannerProvider Provider');
  }

  scan() : Observable<Product>{
    console.log('start scan');
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

    return Observable.from(this.barcodeScanner.scan()).flatMap((barcodeData) => {
      console.log('Got a barcode, querying databases with ', barcodeData);
      return Observable.merge(
        this.dataService.getFoodProduct(barcodeData.text),
        this.dataService.getBeautyProduct(barcodeData.text),
        2)
        .timeout(4000)
        .filter(p => p.exist)
        .first();
    });
  }

  // .subscribe((p) => {
  //   console.log('got produt', p)
  //   this.viewedProvider.addViewed(p);
  // }, (err) => {
  //   console.error(err);
  //   this.toast.show(err, '5000', 'center').subscribe(
  //     toast => {
  //       console.log(toast);
  //     }
  //   );
  // })

}
