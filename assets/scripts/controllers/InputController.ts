import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node } from "cc";
import { InputService } from "../services/InputService";
import { DI } from "../DI";
const { ccclass, property } = _decorator;

@ccclass("InputController")
export class InputController extends Component {
  private _inputService: InputService;

  start() {
    this._inputService = DI.get(InputService.name) as InputService;
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this);
  }
  onKeyDown(event: EventKeyboard) {
    this._inputService.SendKeyInput(event);
  }
  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }
}
