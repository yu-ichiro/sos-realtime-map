import { DefaultedKey, EnumKey } from "@/util";
import { Seasons, stateDependent, Weekdays } from "@/store/sos_state";
import { Place, Places } from "@/assets/places";

/*
 * Boolean
 */
// logic
export const notCondition: (
  condition: stateDependent<boolean>
) => stateDependent<boolean> = condition => state => !condition(state);
export const orCondition: (
  ...conditions: stateDependent<boolean>[]
) => stateDependent<boolean> = (...conditions) => state =>
  conditions.some(condition => condition(state));
export const andCondition: (
  ...conditions: stateDependent<boolean>[]
) => stateDependent<boolean> = (...conditions) => state =>
  conditions.every(condition => condition(state));

// state
export const isSunny: stateDependent<boolean> = state => state.sunny;
export const isWeekday: (
  weekday: EnumKey<typeof Weekdays>
) => stateDependent<boolean> = weekday => state =>
  state.date.readableValue.weekday === weekday;

/*
 * Place
 */
export const minuteSwitch = (
  minuteMapList: [number, stateDependent<Place>][]
): stateDependent<Place> => {
  const minuteMap = new Map<number, stateDependent<Place>>(minuteMapList);
  return state => {
    let currentMinute = state.date.readableValue.minute;
    while (minuteMap.get(currentMinute) == null) {
      currentMinute--;
      if (currentMinute < 0) break;
    }
    return (minuteMap.get(currentMinute) ?? (() => Places.Nowhere))(state);
  };
};
export const hourSwitch = (
  hourMapList: [number, stateDependent<Place>][]
): stateDependent<Place> => {
  const hourMap = new Map<number, stateDependent<Place>>(hourMapList);
  return state => {
    let currentHour = state.date.readableValue.hour;
    while (hourMap.get(currentHour) == null) {
      currentHour--;
      if (currentHour < 6) break;
    }
    return (hourMap.get(currentHour) ?? (() => Places.Nowhere))(state);
  };
};
export const weekdaySwitch = (
  weekdayMapList: [DefaultedKey<typeof Weekdays>, stateDependent<Place>][]
): stateDependent<Place> => {
  const weekdayMap = new Map<
    DefaultedKey<typeof Weekdays>,
    stateDependent<Place>
  >(weekdayMapList);
  return state => {
    const weekday = state.date.readableValue.weekday;
    return (
      weekdayMap.get(weekday) ??
      weekdayMap.get("default") ??
      (() => Places.Nowhere)
    )(state);
  };
};
// noinspection JSUnusedLocalSymbols
export const seasonsSwitch = (
  seasonMapList: [DefaultedKey<typeof Seasons>, stateDependent<Place>][]
): stateDependent<Place> => {
  const timeMap = new Map<DefaultedKey<typeof Seasons>, stateDependent<Place>>(
    seasonMapList
  );
  return state => {
    const season = state.date.readableValue.season;
    return (
      timeMap.get(season) ??
      timeMap.get("default") ??
      (() => Places.Nowhere)
    )(state);
  };
};
export const booleanSwitch = (
  condition: stateDependent<boolean>,
  booleanMapList: [boolean, stateDependent<Place>][]
): stateDependent<Place> => {
  const booleanMap = new Map<boolean, stateDependent<Place>>(booleanMapList);
  return state => {
    return (booleanMap.get(condition(state)) ?? (() => Places.Nowhere))(state);
  };
};
export const sunnySwitch = booleanSwitch.bind(null, isSunny);
