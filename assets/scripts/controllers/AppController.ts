import { _decorator, Component, log, Node, Canvas } from "cc";
import { ScreenService } from "../services/ScreenService";
import { InputService } from "../services/InputService";
import { PoolService, SaveService } from "../services";
import { MetaService } from "../services/MetaService";
const { ccclass, executionOrder, property } = _decorator;

@ccclass("AppController")
@executionOrder(-100)
export class AppController extends Component {
  private _metaService: MetaService;

  start() {
    this.createServices();
    this.loadData();
  }

  private createServices() {
    new ScreenService();
    new InputService();
    new PoolService();
    new SaveService();
    this._metaService = new MetaService();
  }

  private loadData() {
    this._metaService.LoadData();
  }
}
