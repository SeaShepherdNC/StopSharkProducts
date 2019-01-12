import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Add simple module to bar scanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//Add simple module to manage toast
import { Toast } from '@ionic-native/toast';
//Add simple module to provide http methods
import { HttpModule } from '@angular/http';
//Add storage module to provide sqllite storage
import { NativeStorage } from '@ionic-native/native-storage';

import { MyApp } from './app.component';
import { ProductPage } from '../pages/product/product';

import { DataServiceProvider } from '../providers/data-service/data-service';
import { ProductPageModule } from '../pages/product/product.module';
import { ViewedProductsProvider } from '../providers/viewed-products/viewed-products';
import { HistoryPageModule } from '../pages/history/history.module';
import { ProductScannerProvider } from '../providers/product-scanner/product-scanner';

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        ProductPageModule,
        HistoryPageModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        BarcodeScanner,
        Toast,
        DataServiceProvider,
        NativeStorage,
        ViewedProductsProvider,
        ProductScannerProvider,
    ]
})
export class AppModule { }
