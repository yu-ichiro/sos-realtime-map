import {
  getModule,
  Module,
  Mutation,
  VuexModule
} from "vuex-module-decorators";
import store from "@/store";

enum Seasons {
  Spring,
  Summer,
  Autumn,
  Winter
}

enum Weekdays {
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

  // statics
  static getReadableValue(value: number): SosDateReadableValue {
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 4 * month;

    return {
      year: Math.floor(value / year) + 1,
      season: Seasons[
        Math.floor((value % year) / month)
      ] as keyof typeof Seasons,
      weekday: Weekdays[Math.floor(value / day) % 7] as keyof typeof Weekdays,
      day: Math.floor((value % month) / day) + 1,
      hour: Math.floor((value % day) / hour) + 6,
      minute: Math.floor((value % hour) / minute)
    };
  }

  static getValue(readableValue: Partial<SosDateReadableValue>): number {
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 4 * month;

    return (
      ((readableValue.year ?? 1) - 1) * year +
      Seasons[readableValue.season ?? "Spring"] * month +
      ((readableValue.day ?? 1) - 1) * day +
      ((readableValue.hour ?? 6) - 6) * hour +
      (readableValue.minute ?? 0) * minute
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

export interface SosDateInterface {
  date: SosDate;
  auto: boolean;
}

@Module({ dynamic: true, store, name: "sosDate", namespaced: true })
class SosDateModule extends VuexModule implements SosDateInterface {
  date: SosDate = new MutableSosDate();
  auto = false;

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
}

export const sosDateModule = getModule(SosDateModule);
