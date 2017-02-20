import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {File, FileError} from 'ionic-native';

import {Place} from "../models/place.model";
import {Location} from "../models/location.model";

declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage) {
  }

  addPlace(title: string,
           description: string,
           location: Location,
           imageUrl: string) {
    const place = new Place(title, description, imageUrl, location);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(error => {
        this.places.splice(this.places.indexOf(place), 1);
      });
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then((data: Place[]) => {
        this.places = data != null ? data : []
        return this.places.slice();
      })
      .catch(error => {
        console.log(error);
      })
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(() => {
        this.removeImage(place);
      })
      .catch(error => console.log(error));
  }

  private removeImage(place: Place) {
    const tempName = place.imageUrl.replace(/^.*[\\\/]/, '');
    File.removeFile(cordova.file.dataDirectory, tempName)
      .then()
      .catch((error: FileError) => {
        console.log(error.message);
        this.addPlace(place.title, place.description, place.location, place.imageUrl);
      });
  }
}
