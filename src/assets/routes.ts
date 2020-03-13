import {
  add,
  Place,
  Places,
  Vector,
  pos2Vec,
  scale,
  vec2Pos
} from "@/assets/places";
import { stateDependent } from "@/store/sos_state";
import { wrap } from "@/util";

export type Route = [number, Vector][];

export const move = (
  from: Place,
  to: Place,
  route: Route,
  hourOffset: number,
  minuteOffset: number,
  durationMinute: number
) =>
  (state => {
    const progress =
      (60 * (state.date.readableValue.hour - hourOffset) +
        state.date.readableValue.minute -
        minuteOffset) /
      durationMinute;
    const calculatePosition = (progress: number) => {
      if (route.length == 0) return vec2Pos(pos2Vec(Places.Nowhere));
      if (route.length == 1) return vec2Pos(route[0][1]);
      const [routeItemBefore, routeItemAfter] = route.reduce(
        (prev, curr) => {
          if (progress < prev[1][0]) return prev;
          return [prev[1], curr];
        },
        [route[0], route[1]]
      );
      const [t0, t1] = [routeItemBefore[0], routeItemAfter[0]];
      const [x0, y0] = routeItemBefore[1];
      const [x1, y1] = routeItemAfter[1];
      return vec2Pos(
        add([x0, y0], scale([x1 - x0, y1 - y0], (progress - t0) / (t1 - t0)))
      );
    };
    return {
      memo: `移動中(${from.memo}→${to.memo})`,
      accessible: wrap(true),
      ...calculatePosition(progress)
    };
  }) as stateDependent<Place>;

export const Routes: { [key: string]: Route } = {
  GraveToChurch: [
    [0, pos2Vec(Places.ChurchGrave)],
    [1, pos2Vec(Places.Church)]
  ]
};
