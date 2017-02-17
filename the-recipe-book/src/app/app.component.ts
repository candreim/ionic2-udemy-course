import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import firebase from 'firebase';

import {SigninPage} from "../pages/signin/signin";
import {AuthService} from "../services/auth-service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = SigninPage;
  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private menuCtrl: MenuController, private auth: AuthService) {
    //Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyA2dgk8M8l8PmjfYrr3HmbaBjpin-mZiU4",
      authDomain: "ionic-ebb64.firebaseapp.com"
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  protected onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  protected onLogout() {
    this.auth.logout();
    this.onLoad(this.rootPage);
  }
}
