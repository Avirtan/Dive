import {
  _decorator,
  BoxCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  log,
  Node,
  RigidBody2D,
  Vec2,
} from "cc";
import { PoolService } from "../../services";
const { ccclass, property } = _decorator;

@ccclass("Rocket")
export class Rocket extends Component {
  @property({
    type: RigidBody2D,
    visible: true,
  })
  private _rb: RigidBody2D;
  @property({
    type: BoxCollider2D,
    visible: true,
  })
  collider: BoxCollider2D;

  private _poolService: PoolService;
  protected start() {
    this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  public Init(pool: PoolService) {
    this._rb.linearVelocity = new Vec2(10, 0);
    this._poolService = pool;
  }

  protected update(deltaTime: number) {}

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.group == 8 || otherCollider.group == 2) {
      this._poolService.ReleaseRocket(this);
    }
  }

  protected onDestroy(): void {
    this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }
}
