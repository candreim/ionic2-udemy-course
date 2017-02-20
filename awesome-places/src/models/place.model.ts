import {Location} from "./location.model";

export class Place {
  constructor(public title: string,
              public description: string,
              public imagePath: string,
              public location: Location) { }
}
