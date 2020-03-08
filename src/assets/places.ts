import { SosDateReadableValue } from "@/store/sos_date";

export interface Place {
  name: string;
  lockCondition: (val: SosDateReadableValue) => boolean;
  x: number;
  y: number;
}

const MyRanch: Place = {
  name: "牧場",
  lockCondition: () => false,
  x: 385,
  y: 405
};

const ChickenRanch: Place = {
  name: "にわとりりあ",
  lockCondition: () => false,
  x: 548,
  y: 342
};

const Smith: Place = {
  name: "鍛冶屋サイバラ",
  lockCondition: () => false,
  x: 425,
  y: 275
};

const MiscStore: Place = {
  name: "ザっか屋(店舗)",
  lockCondition: (val) => {
    if (["Sun", "Tue"].includes(val.weekday)) return true;
    if (val.hour < 10 || 19 <= val.hour) return true;
    return false
  },
  x: 581,
  y: 93
};

const MiscStorePrivate: Place = {
  name: "ザっか屋(奥)",
  lockCondition: (val) => {
    if (!MiscStore.lockCondition(val)) return false;
    return true
  },
  x: 561,
  y: 53
};

export { MyRanch, ChickenRanch, MiscStore, Smith, MiscStorePrivate };

export const all = [MyRanch, ChickenRanch, MiscStore, Smith, MiscStorePrivate];
