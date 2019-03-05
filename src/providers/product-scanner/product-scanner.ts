import { Injectable } from '@angular/core';
import { DataServiceProvider } from '../data-service/data-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
    //  private viewedProvider: ViewedProductsProvider,
  ) {
    console.log('Hello ProductScannerProvider Provider');
  }

  scan(): Observable<Product> {
    console.log('start scan');

    // Mock
    return Observable.merge(
      this.dataService.getFoodProduct("737628064502"),
      this.dataService.getBeautyProduct("737628064502"),
      2)
      .timeout(4000)
      .filter(p => p.exist)
      .first();
  

    //return Observable.from(this.barcodeScanner.scan()).flatMap((
    //  barcodeData) => {
    //    console.log('Got a barcode, querying databases with ', barcodeData);
    //    return Observable.merge(
    //      this.dataService.getFoodProduct(barcodeData.text),
    //      this.dataService.getBeautyProduct(barcodeData.text),
    //      2)
    //      .timeout(4000)
    //      .filter(p => p.exist)
    //      .first();
    //});



  }
}
