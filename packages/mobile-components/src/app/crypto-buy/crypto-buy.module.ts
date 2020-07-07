import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CryptoBuyComponent } from './crypto-buy.component';
import { CryptoBuyConfig } from './crypto-buy.config';
import { CRYPTO_BUY_CONFIG } from './crypto-buy.config.token';

@NgModule({
    declarations: [
        CryptoBuyComponent
    ],
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
  ],
    exports: [
        CryptoBuyComponent
    ]
  })
  export class CryptoBuyModule {
    static forRoot(options?: CryptoBuyConfig): ModuleWithProviders {
      return {
        ngModule: CryptoBuyModule,
        providers: [
          {
            provide: CRYPTO_BUY_CONFIG,
            useValue: options
          }
        ]
      };
    }
  }
