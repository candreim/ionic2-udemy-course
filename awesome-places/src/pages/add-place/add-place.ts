import {Component, OnInit} from '@angular/core';
import {Place} from "../../models/place.model";
import {ModalController, LoadingController, ToastController} from "ionic-angular";
import {Geolocation, Camera, File, Entry, FileError} from 'ionic-native';

import {SetLocationPage} from "../set-location/set-location";
import {PlacesService} from "../../services/places.service";

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage implements OnInit {
  imageUrl: string;
  place: Place;
  locationIsSet = false;

  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private placesService: PlacesService) {
  }

  onLocate() {
    const loader = this.loadingCtrl.create({content: 'Loading...'})
    loader.present();
    Geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();
      this.place.location.lat = resp.coords.latitude;
      this.place.location.lng = resp.coords.longitude;
      this.locationIsSet = true;
    }).catch((error) => {
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Error picking location!',
        duration: 2500
      });
      toast.present();
    });
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.place.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.place.location = data.location;
        this.locationIsSet = true;
      }
    });
  }

  onTakePhoto() {

    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
      .then(pic => {
        const tempName = pic.replace(/^.*[\\\/]/, '');
        const tempPath = pic.replace(/[^\/]*$/, '');
        const newName = new Date().getUTCMilliseconds() + '.jpg';

        File.moveFile(tempPath, tempName, cordova.file.dataDirectory, newName)
          .then((data: Entry) => {
            this.imageUrl = data.nativeURL;
            Camera.cleanup();
            //File.removeFile(tempPath, tempName);
          })
          .catch((error: FileError) => {
            this.imageUrl = '';
            const toast = this.toastCtrl.create({
              message: error.message,
              duration: 2500
            });
            toast.present();
            Camera.cleanup();
          });
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: error,
          duration: 2500
        });
        toast.present();
      });
  }

  onAddPlace() {
    this.placesService.addPlace(this.place.title, this.place.description, this.place.location, this.imageUrl);
    this.resetParameters();
  }

  ngOnInit() {
    this.resetParameters();
  }

  private resetParameters() {
    this.imageUrl = '';
    this.locationIsSet = false;
    this.place = Place.NewPlace();
    this.place.location = {
      lat: 44.781199,
      lng: -93.464514
    };
  }
}
