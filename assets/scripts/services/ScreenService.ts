import { DI, ObjectDi } from "../DI";
import { screen, math, view, log } from "cc";

export class ScreenService implements ObjectDi {
  constructor() {
    DI.add(this);
  }

  public GetCurrentAspectRatio(): number {
    return screen.windowSize.width / screen.windowSize.height;
  }

  public GetDesignAspectRatio(): number {
    return view.getDesignResolutionSize().width / view.getDesignResolutionSize().height;
  }

  public GetWindowSize(): math.Size {
    return screen.windowSize;
  }

  public GetDesignWindowSize(): math.Size {
    return view.getDesignResolutionSize();
  }

  public GetMaxYPositionInWorld(): number {
    let currentAspectRation = this.GetCurrentAspectRatio();
    let designAspectRation = this.GetDesignAspectRatio();
    let percentDifference = (currentAspectRation - designAspectRation) / designAspectRation;
    let designPositionY = view.getDesignResolutionSize().height / 2;
    //берём разницу в процентах у соотношении сторон, и вычитаем или прибавляем к Y позиции которая для нашего таргетного разрешения,
    //Y позицию можно посмотреть на канвасе
    return designPositionY - percentDifference * designPositionY;
  }

  public GetMaxXPositionInWorld(): number {
    return view.getDesignResolutionSize().width / 2;
  }

  public GetType(): string {
    return ScreenService.name;
  }
}
