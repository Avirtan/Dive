import { _decorator, Component, EPhysics2DDrawFlags, log, Node } from "cc";
import { DI } from "../DI";

import { InputService, SaveService, ScreenService } from "../services";
import { Player } from "../gameObjects/Player/Player";
import { SaveKey } from "../utils";
import { PlayerModel } from "../models/PlayerModel";
import { MetaService } from "../services/MetaService";
import { Canvas } from "../ui/Canvas";
import { Block } from "../gameObjects/block/Block";
import { Coin } from "../gameObjects/Coin";
const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  private _screenService: ScreenService;
  private _inputService: InputService;
  private _saveService: SaveService;
  private _metaService: MetaService;

  @property({
    type: Player,
    visible: true,
  })
  private _player: Player;

  @property({
    type: Node,
    visible: true,
  })
  private _spawnPlayer: Node;

  @property({
    type: Node,
    visible: true,
  })
  private _map: Node;
  @property({
    type: Node,
    visible: true,
  })
  private _coins: Node;

  private _playerModel: PlayerModel;
  private _isStartGame: boolean;
  private _isGameOver: boolean;
  private _canvas: Canvas;

  protected start() {
    this._screenService = DI.get(ScreenService.name) as ScreenService;
    this._inputService = DI.get(InputService.name) as InputService;
    this._saveService = DI.get(SaveService.name) as SaveService;
    this._metaService = DI.get(MetaService.name) as MetaService;

    this._inputService.EnableInput = false;
    this._player.node.setWorldPosition(this._spawnPlayer.worldPosition);
    // PhysicsSystem2D.instance.debugDrawFlags =
    //   EPhysics2DDrawFlags.Aabb |
    //   EPhysics2DDrawFlags.Pair |
    //   EPhysics2DDrawFlags.CenterOfMass |
    //   EPhysics2DDrawFlags.Joint |
    //   EPhysics2DDrawFlags.Shape;
  }

  public SetCanvas(value: Canvas) {
    this._canvas = value;
    this._canvas.UpdateCoin(this._metaService.GetCoin());
  }

  protected update(dt: number): void {
    if (!this._isStartGame || this._isGameOver) return;
    this._playerModel.DecreaseAir(dt);
    if (this._playerModel.Air < 0) {
      for (let coin of this._coins.children) {
        coin.getComponent(Coin).IsActive = true;
        coin.active = true;
      }
      this._isGameOver = true;
      this._metaService.AddCoin(this._player.CountCoint);
      this._canvas.UpdateCoin(this._metaService.GetCoin());
      this.Menu();
      this._inputService.EnableInput = false;
      this._canvas.Menu();
      this._player.Death();
      for (let block of this._map.children) {
        block.getComponent(Block).IsActive = true;
        block.active = true;
      }
    }
  }

  public Upgrade(type: number) {
    let coin = this._metaService.GetCoin();
    if (coin <= 0) return;
    let userSaveData = this._saveService.GetSaveData(SaveKey.UserKey);
    let model = new PlayerModel(0, 0, 0);
    model.FromJson(userSaveData);
    if (type == 0) {
      model.UpgradeAir();
    }
    if (type == 1) {
      model.UpgradeRocket();
    }
    this._saveService.SetSaveData(SaveKey.UserKey, model.ToJson());
    this._metaService.AddCoin(-1);
    this._canvas.UpdateCoin(this._metaService.GetCoin());
  }

  public StartGame() {
    this._inputService.EnableInput = true;
    this._isStartGame = true;
    this._isGameOver = false;

    let userSaveData = this._saveService.GetSaveData(SaveKey.UserKey);
    if (userSaveData == null) {
      this._playerModel = new PlayerModel(10, 2, 5);
      this._saveService.SetSaveData(SaveKey.UserKey, this._playerModel.ToJson());
    } else {
      this._playerModel = new PlayerModel(0, 0, 0);
      this._playerModel.FromJson(userSaveData);
    }
    this._player.Init(this._playerModel);
    this._player.node.setWorldPosition(this._spawnPlayer.worldPosition);
  }

  public Menu() {
    this._player.node.setWorldPosition(this._spawnPlayer.worldPosition);
    this._player.DisableHud();
  }
}
