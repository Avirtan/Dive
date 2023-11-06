import { _decorator, Component, instantiate, log, Node, Pool, Prefab } from "cc";
import { DI } from "../DI";
import { PoolService } from "../services";
import { Rocket } from "../gameObjects/Player/Rocket";
const { ccclass, property } = _decorator;

@ccclass("PoolController")
export class PoolController extends Component {
  private _poolService: PoolService;
  @property({
    type: Prefab,
    visible: true,
  })
  private _rocket: Prefab;
  private _pool: Pool<Rocket>;

  private _disableNodes: Node[] = [];

  protected start() {
    this._poolService = DI.get(PoolService.name) as PoolService;
    this._pool = new Pool<Rocket>(() => instantiate(this._rocket).getComponent(Rocket), 1);
    this._poolService.SetController(this);
  }

  protected update(dt: number): void {
    if (this._disableNodes.length > 0) {
      for (let i = 0; i < this._disableNodes.length; i++) {
        let node = this._disableNodes[i];
        node.active = false;
      }
      this._disableNodes = this._disableNodes.filter((value: Node) => value.active);
    }
  }

  public GetRocket(): Rocket {
    let rocket = this._pool.alloc();
    rocket.node.active = true;
    return rocket;
  }

  // сделать свой пулл так как этот не работает
  public ReleaseRocket(rocket: Rocket) {
    this._disableNodes.push(rocket.node);
    this._pool.free(rocket);
  }
}
