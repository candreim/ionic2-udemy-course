import { Component } from '@angular/core';
import {Quote} from "../../data/quote.interface";
import {QuotesServices} from "../../services/quotes";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(private quotesService: QuotesServices) { }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getQuotes();
  }
}
