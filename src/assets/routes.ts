/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { minuteSwitch } from "@/store/util/state_dependents";

export type Move = [number, Vector][];

export interface Route {
  from: Place;
  to: Place;
  move: Move;
  duration: number;
}

export const move = (route: Route, hourOffset: number, minuteOffset: number) =>
  (state => {
    const progress =
      60 * (state.date.readableValue.hour - hourOffset) +
      state.date.readableValue.minute -
      minuteOffset;
    const calculatePosition = (progress: number) => {
      if (route.move.length == 0) return vec2Pos(pos2Vec(Places.Nowhere));
      if (route.move.length == 1) return vec2Pos(route.move[0][1]);
      const [routeItemBefore, routeItemAfter] = route.move.reduce(
        (prev, curr) => {
          if (progress < prev[1][0]) return prev;
          return [prev[1], curr];
        },
        [route.move[0], route.move[1]]
      );
      const [t0, t1] = [routeItemBefore[0], routeItemAfter[0]];
      const [x0, y0] = routeItemBefore[1];
      const [x1, y1] = routeItemAfter[1];
      return vec2Pos(
        add([x0, y0], scale([x1 - x0, y1 - y0], (progress - t0) / (t1 - t0)))
      );
    };
    return {
      memo: `移動中(${route.from.memo}→${route.to.memo})`,
      accessible: wrap(true),
      ...calculatePosition(progress)
    };
  }) as stateDependent<Place>;

export const animateArrive = (route: Route, hourToArrive: number) => {
  const hoursToConsume = Math.floor(route.duration / 60);
  const hourToDepart = hourToArrive - hoursToConsume - 1;
  const minuteToDepart = 60 - (route.duration - hoursToConsume * 60);
  let durationConsumed = 0;
  const result: [number, stateDependent<Place>][] = [];
  for (let hour = hourToDepart; hour < hourToArrive; hour++) {
    const durationToConsume =
      route.duration - (hourToArrive - hour - 1) * 60 - durationConsumed;
    const minuteStep: [number, stateDependent<Place>][] = [
      [60 - durationToConsume, move(route, hourToDepart, minuteToDepart)]
    ];
    if (durationToConsume % 60 > 0) minuteStep.unshift([0, wrap(route.from)]);
    result.push([hour, minuteSwitch(minuteStep)]);
    durationConsumed += durationToConsume;
  }
  return result;
};

export const animateDepart = (route: Route, hourToDepart: number) => {
  const hoursToConsume = Math.floor(route.duration / 60);
  const hourToArrive = hourToDepart + hoursToConsume;
  const minuteToDepart = 0;
  let durationConsumed = 0;
  const result: [number, stateDependent<Place>][] = [];
  for (let hour = hourToDepart; hour <= hourToArrive; hour++) {
    const durationToConsume =
      route.duration - (hourToArrive - hour) * 60 - durationConsumed;
    const minuteStep: [number, stateDependent<Place>][] = [
      [0, move(route, hourToDepart, minuteToDepart)]
    ];
    if (durationToConsume % 60 > 0)
      minuteStep.push([durationToConsume, wrap(route.to)]);
    result.push([hour, minuteSwitch(minuteStep)]);
    durationConsumed += durationToConsume;
  }
  return result;
};

export const reverse = (route: Route) =>
  ({
    from: route.to,
    to: route.from,
    move: route.move
      .reverse()
      .map(([step, vec]) => [route.duration - step, vec]),
    duration: route.duration
  } as Route);

export const Routes: { [key: string]: Route } = {
  GraveToChurch: {
    from: Places.ChurchGrave,
    to: Places.Church,
    move: [
      [0, pos2Vec(Places.ChurchGrave)],
      [10, pos2Vec(Places.Church)]
    ],
    duration: 10
  }
};
