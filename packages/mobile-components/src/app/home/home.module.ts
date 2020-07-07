import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CryptoBuyModule } from '../crypto-buy/crypto-buy.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CryptoBuyModule.forRoot({
      defaultCssClass: 'override-default-form-input',
      errorCssClass: 'form-error',
      successCssClass: 'form-success'
    })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
