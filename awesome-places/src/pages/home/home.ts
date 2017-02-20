import {Component, OnInit} from '@angular/core';
import {ModalController} from "ionic-angular";

import {AddPlacePage} from "../add-place/add-place";
import {PlacesService} from "../../services/places.service";
import {Place} from "../../models/place.model";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  places: Place[] = []
  addPlacePage = AddPlacePage;

  constructor(private placesService: PlacesService, private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present()
  }

  ngOnInit() {
    this.placesService.fetchPlaces()
      .then((places: Place[]) => this.places = places);
  }

}
