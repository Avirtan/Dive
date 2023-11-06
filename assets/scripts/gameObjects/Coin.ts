import {
  _decorator,
  BoxCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Node,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Coin")
export class Coin extends Component {
  @property({
    type: BoxCollider2D,
    visible: true,
  })
  collider: BoxCollider2D;

  public IsActive: boolean;

  start() {
    this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    this.IsActive = true;
  }

  update(deltaTime: number) {
    this.node.active = this.IsActive;
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.group == 4) {
      this.IsActive = false;
    }
  }

  protected onDestroy(): void {
    this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }
}
