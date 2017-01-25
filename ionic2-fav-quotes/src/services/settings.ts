export class SettingsServices {

  private altBackground: boolean = false;

  setAltBackground(stage: boolean) {
    this.altBackground = stage;
  }

  getAltBackground() {
    return this.altBackground;
  }

}
