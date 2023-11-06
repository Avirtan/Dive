import { _decorator, Button, Camera, Component, Label, Node } from "cc";
import { InputService } from "../services";
import { DI } from "../DI";
import { GameController } from "../controllers/GameController";
const { ccclass, property } = _decorator;

@ccclass("Canvas")
export class Canvas extends Component {
  @property({
    type: Button,
    visible: true,
  })
  _btnHelp: Button | null = null;
  @property({
    type: Node,
    visible: true,
  })
  _panelHelp: Node | null = null;
  @property({
    type: Button,
    visible: true,
  })
  _btnStartGame: Button | null = null;
  @property({
    type: Button,
    visible: true,
  })
  _btnUpgAir: Button | null = null;
  @property({
    type: Button,
    visible: true,
  })
  _btnUpgRocket: Button | null = null;

  @property({
    type: GameController,
    visible: true,
  })
  _gameController: GameController | null = null;
  @property({
    type: Camera,
    visible: true,
  })
  _UiCamera: Camera | null = null;
  @property({
    type: Label,
    visible: true,
  })
  private _countCoins: Label;

  protected start() {
    this._btnHelp.node.on(Button.EventType.CLICK, this.ShowHelpPanel, this);
    this._btnStartGame.node.on(Button.EventType.CLICK, this.StartGame, this);
    this._btnUpgAir.node.on(Button.EventType.CLICK, this.UpgAir, this);
    this._btnUpgRocket.node.on(Button.EventType.CLICK, this.UpgRocket, this);

    this._gameController.SetCanvas(this);
  }

  private ShowHelpPanel(button: Button) {
    this._panelHelp.active = true;
  }

  private DisableMenuPanel() {
    this._panelHelp.active = false;
  }

  private StartGame(button: Button) {
    this.DisableMenuPanel();
    this._UiCamera.priority = -1;
    this._gameController.StartGame();
  }

  private UpgAir(button: Button) {
    this._gameController.Upgrade(0);
  }

  private UpgRocket(button: Button) {
    this._gameController.Upgrade(1);
  }

  public Menu() {
    this._UiCamera.priority = 2;
  }
  public UpdateCoin(value: number) {
    this._countCoins.string = `Всего монет: ${value}`;
  }

  protected onDestroy(): void {
    this._btnHelp.node.off(Button.EventType.CLICK, this.ShowHelpPanel, this);
    this._btnStartGame.node.off(Button.EventType.CLICK, this.StartGame, this);
    this._btnUpgAir.node.off(Button.EventType.CLICK, this.UpgAir, this);
    this._btnUpgRocket.node.off(Button.EventType.CLICK, this.UpgRocket, this);
  }
}
