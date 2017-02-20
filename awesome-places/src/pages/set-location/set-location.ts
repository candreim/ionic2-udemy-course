import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../models/location.model";

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html'
})
export class SetLocationPage {
  location: Location;
  marker: Location;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.location = this.navParams.get('location');
    if (this.navParams.get('location')) {
      this.marker = this.location;
    }
  }

  protected onSetMarker(event: any) {
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }

  protected onConfirm() {
    this.viewCtrl.dismiss({location: this.marker});
  }

  protected onAbort() {
    this.viewCtrl.dismiss();
  }
}
