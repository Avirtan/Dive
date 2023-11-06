import { EventKeyboard, KeyCode, math, EventTarget, log, Vec2 } from "cc";
import { DI, ObjectDi } from "../DI";
import { CustomInputEvent, SaveKey } from "../utils";
import { MetaState } from "../states";
import { SaveService } from "./SaveService";

export class MetaService implements ObjectDi {
  private _metaState: MetaState;
  private _saveService: SaveService;

  constructor() {
    DI.add(this);
  }

  public LoadData() {
    if (this._saveService == null) {
      this._saveService = DI.get(SaveService.name) as SaveService;
    }
    let jsonData = this._saveService.GetSaveData(SaveKey.MetaKey);
    if (jsonData == null) {
      this._metaState = new MetaState(0);
      this._saveService.SetSaveData(SaveKey.MetaKey, this._metaState.ToJson());
    } else {
      this._metaState = new MetaState(0);
      this._metaState.FromJson(jsonData);
    }
  }

  public AddCoin(count: number) {
    this._metaState.AddCoint(count);
    this._saveService.SetSaveData(SaveKey.MetaKey, this._metaState.ToJson());
  }

  public GetCoin() {
    return this._metaState.Coin;
  }

  public GetType(): string {
    return MetaService.name;
  }
}
