import { EventKeyboard, KeyCode, math, EventTarget, log, Vec2, Pool, instantiate } from "cc";
import { DI, ObjectDi } from "../DI";
import { PoolController } from "../controllers/PoolController";
import { Rocket } from "../gameObjects/Player/Rocket";

export class PoolService implements ObjectDi {
  public EventMove = new EventTarget();
  private _poolController: PoolController;

  constructor() {
    DI.add(this);
  }

  public SetController(controller: PoolController) {
    this._poolController = controller;
  }

  public GetRocket(): Rocket {
    return this._poolController.GetRocket();
  }

  public ReleaseRocket(rocket: Rocket) {
    this._poolController.ReleaseRocket(rocket);
  }

  public GetType(): string {
    return PoolService.name;
  }
}
