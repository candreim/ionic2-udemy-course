import {Component, OnInit} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage implements OnInit {
  name: string;

  constructor(private navCtrl: NavController,
              private navParams: NavParams){}

  onGoBack() {
    //this.navCtrl.pop(); //Return to the previous page
    this.navCtrl.popToRoot(); //Return to the root page
  }

  ngOnInit() {
    this.name = this.navParams.get('userName');
  }
}
