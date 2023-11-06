import { _decorator, Component, Label, log, Node } from "cc";
import { PlayerModel } from "../models/PlayerModel";
const { ccclass, property } = _decorator;

@ccclass("Hud")
export class Hud extends Component {
  @property({
    type: Label,
    visible: true,
  })
  private _cooldownRocketLabel: Label;
  @property({
    type: Label,
    visible: true,
  })
  private _timeAir: Label;
  @property({
    type: Label,
    visible: true,
  })
  private _countRocket: Label;
  @property({
    type: Label,
    visible: true,
  })
  private _countCoins: Label;
  private _playerModel: PlayerModel;

  public Init(playerModel: PlayerModel) {
    this._playerModel = playerModel;
  }

  public SetCooldown(cd: number) {
    this._cooldownRocketLabel.string = `До запуска ракеты: ${cd.toFixed(1)}`;
    this._cooldownRocketLabel.node.active = cd > 0;
  }

  protected update(dt: number): void {
    this._countRocket.string = `Количество ракет: ${this._playerModel.CountRocket}`;
    this._timeAir.string = `Воздуха на: ${this._playerModel.Air.toFixed(1)}`;
  }

  public SetCoin(value: number) {
    this._countCoins.string = `Собрано монет: ${value}`;
  }
}
