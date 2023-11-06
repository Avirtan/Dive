export class PlayerModel {
  private _air: number;
  private _countRocket: number;
  private _cooldownRocket: number;

  public get Air() {
    return this._air;
  }
  public get CountRocket() {
    return this._countRocket;
  }
  public get CooldownRocket() {
    return this._cooldownRocket;
  }
  public UpgradeAir() {
    this._air += 1;
  }
  public UpgradeRocket() {
    this._countRocket += 1;
  }

  public DecreaseRocket() {
    this._countRocket -= 1;
  }

  public DecreaseAir(value: number) {
    this._air -= value;
  }

  constructor(air: number, countRocket: number, cooldownRocker: number) {
    this._air = air;
    this._countRocket = countRocket;
    this._cooldownRocket = cooldownRocker;
  }

  public FromJson(obj: any) {
    this._air = obj.air;
    this._cooldownRocket = obj.cooldownRocket;
    this._countRocket = obj.countRocket;
  }

  public ToJson(): string {
    return JSON.stringify({
      air: this._air,
      countRocket: this._countRocket,
      cooldownRocket: this._cooldownRocket,
    });
  }
}
