export class MetaState {
  private _coin: number;

  public get Coin() {
    return this._coin;
  }

  constructor(coint: number) {
    this._coin = coint;
  }

  public AddCoint(count: number) {
    this._coin += count;
  }

  public FromJson(obj: any) {
    this._coin = obj.coin;
  }

  public ToJson(): string {
    return JSON.stringify({
      coin: this._coin,
    });
  }
}
