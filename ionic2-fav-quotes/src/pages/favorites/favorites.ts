import { Component } from '@angular/core';
import {ModalController} from "ionic-angular";

import {Quote} from "../../data/quote.interface";
import {QuotesServices} from "../../services/quotes";
import {QuotePage} from "../quote/quote";
import {SettingsServices} from "../../services/settings";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(private quotesService: QuotesServices,
              private modalCtrl: ModalController,
              private settingsService: SettingsServices) {
  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFav(quote);
      }
    });

    // modal.willLeave.subscribe(
    //   (remove: boolean) => console.log('willLeave')
    // );
  }

  onRemoveFromFav(quote: Quote) {
    this.quotesService.removeQuote(quote);
    //this.quotes = this.quotesService.getQuotes();
    const index = this.quotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(index, 1);
  }

  getBackground() {
   return this.settingsService.getAltBackground() ? "quote" : "altQuote";
  }

  isAltBackground() {
    return this.settingsService.getAltBackground();
  }
}
