import { Component, OnInit, Inject } from '@angular/core';
import { CRYPTO_BUY_CONFIG } from './crypto-buy.config.token';
import { CryptoBuyConfig } from './crypto-buy.config';

@Component({
  selector: 'app-crypto-buy',
  templateUrl: './crypto-buy.component.html',
  styleUrls: ['./crypto-buy.component.scss'],
})
export class CryptoBuyComponent implements OnInit {

  constructor( @Inject(CRYPTO_BUY_CONFIG) private config: CryptoBuyConfig ) { }

  ngOnInit() {}

}
