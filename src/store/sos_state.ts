import {
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import store from "@/store";

export enum Seasons {
  Spring,
  Summer,
  Autumn,
  Winter
}

export enum Weekdays {
  Sun,
  Mon,
  Tue,
  Wed,
  Thr,
  Fri,
  Sat
}

export type SosDateReadableValue = {
  year: number;
  season: keyof typeof Seasons;
  weekday: keyof typeof Weekdays;
  day: number;
  hour: number;
  minute: number;
};

export class SosDate {
  _value = 60 * 60 * 24; // 1年目春2日

  get value(): number {
    return this._value;
  }

  constructor();
  constructor(value: number);
  constructor(value: Partial<SosDateReadableValue>);
  constructor(value?: number | Partial<SosDateReadableValue>) {
    if (value == null) return;
    if (typeof value == "number") this._value = value;
    else this._value = SosDate.getValue(value);
  }

  get readableValue(): SosDateReadableValue {
    return SosDate.getReadableValue(this.value);
  }

  replaced(readableValue: Partial<SosDateReadableValue>): SosDate {
    return new SosDate(
      SosDate.getValue(
        Object.assign(Object.create(null), this.readableValue, readableValue)
      )
    );
  }

  // statics
  static get minute(): number {
    return 60;
  }
  static get hour(): number {
    return 60 * SosDate.minute;
  }
  static get day(): number {
    return 24 * SosDate.hour;
  }
  static get month(): number {
    return 30 * SosDate.day;
  }
  static get year(): number {
    return 4 * SosDate.month;
  }

  static getReadableValue(value: number): SosDateReadableValue {
    return {
      year: Math.floor(value / SosDate.year) + 1,
      season: Seasons[
        Math.floor((value % SosDate.year) / SosDate.month)
      ] as keyof typeof Seasons,
      weekday: Weekdays[
        Math.floor(value / SosDate.day) % 7
      ] as keyof typeof Weekdays,
      day: Math.floor((value % SosDate.month) / SosDate.day) + 1,
      hour: Math.floor((value % SosDate.day) / SosDate.hour) + 6,
      minute: Math.floor((value % SosDate.hour) / SosDate.minute)
    };
  }

  static getValue(readableValue: Partial<SosDateReadableValue>): number {
    return (
      ((readableValue.year ?? 1) - 1) * SosDate.year +
      Seasons[readableValue.season ?? "Spring"] * SosDate.month +
      ((readableValue.day ?? 1) - 1) * SosDate.day +
      ((readableValue.hour ?? 6) - 6) * SosDate.hour +
      (readableValue.minute ?? 0) * SosDate.minute
    );
  }
}

class MutableSosDate extends SosDate {
  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    this._value = newValue;
  }

  replace(newReadableValue: Partial<SosDateReadableValue>) {
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 4 * month;

    const oldReadableValue = this.readableValue;

    this.value =
      ((newReadableValue.year ?? oldReadableValue.year) - 1) * year +
      Seasons[newReadableValue.season ?? oldReadableValue.season] * month +
      ((newReadableValue.day ?? oldReadableValue.day) - 1) * day +
      ((newReadableValue.hour ?? oldReadableValue.hour) - 6) * hour +
      (newReadableValue.minute ?? oldReadableValue.minute) * minute;
  }
}

function _unwrapMutableSosDate(_sosDate: SosDate): MutableSosDate {
  return _sosDate as MutableSosDate;
}

export interface SosStateInterface {
  date: SosDate;
  sunny: boolean;
}

@Module({ dynamic: true, store, name: "sosDate" })
class SosStateModule extends VuexModule implements SosStateInterface {
  date: SosDate = new MutableSosDate();
  sunny = true;

  get getState(): SosStateInterface {
    return {
      date: this.date,
      sunny: this.sunny
    };
  }

  @Mutation
  increment() {
    _unwrapMutableSosDate(this.date).replace({
      minute: this.date.readableValue.minute + 10
    });
  }

  @Mutation
  decrement() {
    _unwrapMutableSosDate(this.date).replace({
      minute: this.date.readableValue.minute - 10
    });
  }

  @Mutation
  replaceDateState(val: Partial<SosDateReadableValue>) {
    _unwrapMutableSosDate(this.date).replace(val);
  }

  @Mutation
  addValue(value: number) {
    this.date = new MutableSosDate(this.date.value + value);
  }

  @Mutation
  setSunnyState(val: boolean) {
    this.sunny = val;
  }
}

export const sosStateModule = getModule(SosStateModule);

export type stateCondition = (val: SosStateInterface) => boolean;
export type stateDependent<T> = (val: SosStateInterface) => T;
