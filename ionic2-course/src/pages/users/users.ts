import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {UserPage} from "./user/user";

@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {}

  onLoadUser(name: string){
    this.navCtrl.push(UserPage, { userName: name });
  }
}
