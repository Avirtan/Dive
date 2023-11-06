import {
  _decorator,
  Component,
  instantiate,
  log,
  math,
  Pool,
  Prefab,
  RigidBody2D,
  Vec2,
  Node,
  KeyCode,
  RichText,
  Label,
  BoxCollider2D,
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
} from "cc";
import { InputService } from "../../services/InputService";
import { DI } from "../../DI";
import { CustomInputEvent } from "../../utils";
import { PoolService } from "../../services";
import { PlayerModel } from "../../models/PlayerModel";
import { Hud } from "../../ui/Hud";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  private _inputService: InputService;
  private _poolService: PoolService;

  @property({
    type: RigidBody2D,
    visible: true,
  })
  private _rb: RigidBody2D;

  @property({
    type: Node,
    visible: true,
  })
  private _spawnRocket: Node;

  @property({
    type: BoxCollider2D,
    visible: true,
  })
  collider: BoxCollider2D;
  @property({
    type: Hud,
    visible: true,
  })
  _hud: Hud;

  public CountCoint: number;

  private _CooldownRocket: number;
  private _playerModel: PlayerModel;

  protected start() {
    this._inputService = DI.get(InputService.name) as InputService;
    this._poolService = DI.get(PoolService.name) as PoolService;

    this._inputService.EventMove.on(CustomInputEvent.MoveEvent, this.InputEvent, this);
    this._inputService.EventAction.on(CustomInputEvent.ActionEvent, this.ActionEvent, this);
    this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }

  public Init(playerModel: PlayerModel) {
    this._playerModel = playerModel;
    this._CooldownRocket = 0;
    this._hud.node.active = true;
    this._hud.Init(playerModel);
    this._hud.SetCooldown(0);
    this.CountCoint = 0;
    this._hud.SetCoin(0);
  }

  public DisableHud() {
    this._hud.node.active = false;
  }

  private InputEvent(vectorMove: Vec2) {
    this._rb.applyForceToCenter(vectorMove.multiplyScalar(100), true);
  }

  public Death() {
    this._rb.linearVelocity = Vec2.ZERO;
  }

  private ActionEvent(code: KeyCode) {
    if (code == KeyCode.SPACE && this._CooldownRocket <= 0 && this._playerModel.CountRocket > 0) {
      this._CooldownRocket = this._playerModel.CooldownRocket;
      this._playerModel.DecreaseRocket();
      let rocket = this._poolService.GetRocket();
      rocket.node.parent = this._spawnRocket;
      rocket.node.setPosition(0, 0);
      rocket.Init(this._poolService);
    }
  }

  protected update(deltaTime: number) {
    if (this._CooldownRocket > 0) {
      this._CooldownRocket -= deltaTime;
      this._hud.SetCooldown(this._CooldownRocket);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    if (otherCollider.group == 32) {
      this.CountCoint += 1;
      this._hud.SetCoin(this.CountCoint);
    }
  }

  protected onDestroy() {
    this._inputService.EventMove.off(CustomInputEvent.MoveEvent, this.InputEvent, this);
    this._inputService.EventAction.off(CustomInputEvent.ActionEvent, this.ActionEvent, this);
    this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
  }
}
