import {Component, OnInit} from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';

import {Quote} from "../../data/quote.interface";
import {QuotesServices} from "../../services/quotes";

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html'
})
export class QuotesPage implements OnInit {
  quoteGrp:  { category: string, quotes: Quote[], icon: string };

  constructor(private navParams: NavParams,
              private alertCtrl: AlertController, private quotesService: QuotesServices) { }

  onAddToFav(quote: Quote) {
   const alert = this.alertCtrl.create({
     title: 'Add Quote',
     subTitle: 'Are you sure',
     message: 'Are you sure you want to add the quote?',
     buttons: [
       {
         text: 'Yes, go ahead!',
         handler: () => {
           this.quotesService.addQuote(quote);
         }
       },
       {
         role: 'cancel',
         text: 'No, I do not want to.'
       }
     ]
   });

   alert.present();
  }

  onRemoveFromFav(quote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Remove Quote',
      message: 'Do you want to remove the quote?',
      buttons: [
        {
          text: 'Yes, go ahead!',
          handler: () => {
            this.quotesService.removeQuote(quote);
          }
        },
        {
          role: 'cancel',
          text: 'No, I do not want to.'
        }
      ]
    });

    alert.present();
  }

  isFavorite(quote: Quote) {
    return this.quotesService.isQuoteFavorite(quote);
  }

  ngOnInit() {
    this.quoteGrp = this.navParams.data;
  }

  ionViewDidLoad() {
    //this.quoteGrp = this.navParams.data;
  }
}
