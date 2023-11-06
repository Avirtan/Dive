import { _decorator, Button, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("HelpPanel")
export class HelpPanel extends Component {
  @property({
    type: Button,
    visible: true,
  })
  _btnClose: Button | null = null;
  protected start() {
    this._btnClose.node.on(Button.EventType.CLICK, this.closePanel, this);
  }
  private closePanel(button: Button) {
    this.node.active = false;
  }
  protected onDestroy(): void {
    this._btnClose.node.off(Button.EventType.CLICK, this.closePanel, this);
  }
}
