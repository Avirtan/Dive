import { EventKeyboard, KeyCode, math, EventTarget, log, Vec2 } from "cc";
import { DI, ObjectDi } from "../DI";
import { CustomInputEvent } from "../utils";

export class InputService implements ObjectDi {
  public EventMove = new EventTarget();
  public EventAction = new EventTarget();
  private _vectorMove: Vec2 = new Vec2();
  private _isEnbaleInput: boolean;

  set EnableInput(value: boolean) {
    this._isEnbaleInput = value;
  }

  constructor() {
    DI.add(this);
  }

  public SendKeyInput(event: EventKeyboard) {
    if (!this._isEnbaleInput) return;
    this._vectorMove.set(0, 0);
    let eventKeyCode = event.keyCode;
    if (eventKeyCode == KeyCode.KEY_D || eventKeyCode == KeyCode.KEY_A) {
      this._vectorMove.x = eventKeyCode == KeyCode.KEY_D ? 1 : -1;
    }
    if (eventKeyCode == KeyCode.KEY_W || eventKeyCode == KeyCode.KEY_S) {
      this._vectorMove.y = eventKeyCode == KeyCode.KEY_W ? 1 : -1;
    }
    if (eventKeyCode == KeyCode.SPACE) {
      this.EventAction.emit(CustomInputEvent.ActionEvent, eventKeyCode);
    }
    this.EventMove.emit(CustomInputEvent.MoveEvent, this._vectorMove);
  }

  public GetType(): string {
    return InputService.name;
  }
}
