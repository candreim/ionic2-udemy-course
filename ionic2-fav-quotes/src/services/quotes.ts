import {Quote} from "../data/quote.interface";

export class QuotesServices {
  private favoriteQuotes: Quote[] = [];

  addQuote(quote: Quote) {
    this.favoriteQuotes.push(quote);
    console.log(quote);
  }

  removeQuote(quote: Quote) {
    const index = this.favoriteQuotes.findIndex(
      (quoteElem: Quote) => {
        return quoteElem.id == quote.id;
      }
    );

    this.favoriteQuotes.splice(index, 1);
  }

  getQuotes() {
    return this.favoriteQuotes.slice();
  }

}
