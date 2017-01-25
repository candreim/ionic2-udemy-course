import { Component } from '@angular/core';
import {Toggle} from "ionic-angular";
import {SettingsServices} from "../../services/settings";


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(private settingsService: SettingsServices) { }

  onToggle(toggle: Toggle) {
      this.settingsService.setAltBackground(toggle.checked);
  }

  checkBackground() {
    return this.settingsService.getAltBackground();
  }
}
