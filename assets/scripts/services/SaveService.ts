import { sys } from "cc";
import { DI, ObjectDi } from "../DI";
import { SaveKey } from "../utils";

export class SaveService implements ObjectDi {
  constructor() {
    DI.add(this);
  }

  public SetSaveData(key: string, data: string) {
    return sys.localStorage.setItem(key, data);
  }

  public GetSaveData(key: string): any {
    return JSON.parse(sys.localStorage.getItem(key));
  }

  public ClearData() {
    sys.localStorage.clear();
  }

  public GetType(): string {
    return SaveService.name;
  }
}
