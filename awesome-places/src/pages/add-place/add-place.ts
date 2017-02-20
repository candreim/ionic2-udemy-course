import {Component, OnInit} from '@angular/core';
import {Place} from "../../models/place.model";
import {ModalController} from "ionic-angular";
import {SetLocationPage} from "../set-location/set-location";

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage implements OnInit {
  place: Place;

  constructor(private modalCtrl: ModalController) { }

  onLocate() {

  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage);
    modal.present();
  }

  onTakePhoto() {}

  onAddPlace() {

  }

  ngOnInit() {
    this.place = Place.NewPlace();
  }

}
