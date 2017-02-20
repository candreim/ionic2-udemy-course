import {Location} from "./location.model";

export class Place {
  constructor(public title: string,
              public description: string,
              public imagePath: string,
              public location: Location) { }

  public static NewPlace()
  {
    return new Place(null, null, null, new Location(0, 0));
  }
}
