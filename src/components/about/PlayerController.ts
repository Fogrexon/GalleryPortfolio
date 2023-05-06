import { getMapInfo } from "./floorMap";

export class PlayerController {
  private x: number;
  private y: number;

  private path: []
  private nextTarget: {x: number, y: number}

  constructor() {
    const mapInfo = getMapInfo();
    this.x = Math.floor(mapInfo.width / 2);
    this.y = Math.floor(mapInfo.height / 2);
  }

  public updateTarget(x: number, y: number) {
    this.path = pathFinding(this.nextTarget, { x, y })
    this.nextTarget = this.path.shift()
  }

  public getNextStep() {

  }
}