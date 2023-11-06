import { ObjectDi } from "./ObjectDI";

export abstract class DI {
  public static objects: Map<string, ObjectDi> = new Map<string, ObjectDi>();

  static get(type: string): ObjectDi | undefined {
    return this.objects.get(type);
  }

  static add(obj: ObjectDi) {
    const type = obj.GetType();
    if (this.objects.has(type)) return;
    this.objects.set(type, obj);
  }
}
