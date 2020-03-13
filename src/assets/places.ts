/* eslint-disable @typescript-eslint/no-unused-vars */
import { stateCondition } from "@/store/sos_state";
import { Characters } from "@/assets/characters";

export type Vector = [number, number]

export const vec2Pos = (vec: [number, number]) => ({
  x: vec[0],
  y: vec[1]
});

export const pos2Vec = (pos: { x: number; y: number }) =>
  [pos.x, pos.y] as Vector;

export const scale = (vec: Vector, vel: number) =>
  [vel * vec[0], vel * vec[1]] as Vector;

export const add = (vec1: Vector, vec2: Vector) =>
  [vec1[0] + vec2[0], vec1[1] + vec2[1]] as Vector;

export interface Place {
  memo: string;
  accessible: stateCondition;
  x: number;
  y: number;
}

export const Places: Record<string, Place> = {
  Nowhere: {
    memo: "不明",
    accessible: () => false,
    x: -10000,
    y: -10000
  },
  MyRanch: {
    memo: "牧場",
    accessible: () => true,
    x: 385,
    y: 405
  },
  MountainMiddle: {
    memo: "裏山(中腹)",
    accessible: () => true,
    x: 98,
    y: 230
  },
  Fountain: {
    memo: "泉周辺",
    accessible: () => true,
    x: 242,
    y: 360
  },
  Lake: {
    memo: "湖周辺",
    accessible: () => true,
    x: 87,
    y: 457
  },
  HotSpring: {
    memo: "温泉",
    accessible: () => true,
    x: 221,
    y: 442
  },
  Square: {
    memo: "広場",
    accessible: () => true,
    x: 784,
    y: 252
  },
  Church: {
    memo: "教会",
    accessible: () => true,
    x: 783,
    y: 93
  },
  ChurchGrave: {
    memo: "教会墓地",
    accessible: () => true,
    x: 729,
    y: 87
  },
  ChurchFront: {
    memo: "教会前",
    accessible: () => true,
    x: 765,
    y: 106
  },
  ChurchConfession: {
    memo: "教会(懺悔室)",
    accessible: state =>
      Characters.Carter.place(state) === Places.ChurchConfession,
    x: 758,
    y: 61
  },
  Hotel: {
    memo: "ダッドの店",
    accessible: () => true,
    x: 560,
    y: 174
  },
  HotelPrivate: {
    memo: "ダッドの店(奥)",
    accessible: () => false,
    x: 560,
    y: 147
  },
  HotelSecond: {
    memo: "ダッドの店(２階)",
    accessible: () => true,
    x: 560,
    y: 160
  },
  HouseBasil: {
    memo: "バジルの家",
    accessible: state =>
      Characters.Anna.place(state) === Places.HouseBasil ||
      Characters.Basil.place(state) === Places.HouseBasil,
    x: 377,
    y: 82
  },
  HouseBasilSecond: {
    memo: "バジルの家(2階)",
    accessible: state => Places.HouseBasil.accessible(state),
    x: 388,
    y: 59
  },
  YodelRanch: {
    memo: "ヨーデル牧場",
    accessible: () => true,
    x: 711,
    y: 381
  },
  YodelRanchFirst: {
    memo: "ヨーデル牧場(1階)",
    accessible: () => true,
    x: 685,
    y: 350
  },
  YodelRanchSecond: {
    memo: "ヨーデル牧場(2階)",
    accessible: () => false,
    x: 701,
    y: 322
  },
  YodelRanchYard: {
    memo: "ヨーデル牧場(庭)",
    accessible: () => true,
    x: 638,
    y: 338
  },
  HouseTomas: {
    memo: "町長の家",
    accessible: () => true,
    x: 490,
    y: 83
  },
  Winery: {
    memo: "アージュワイナリー",
    accessible: () => true,
    x: 414,
    y: 283
  },
  WineryBase: {
    memo: "アージュワイナリー(貯蔵庫)",
    accessible: () => true,
    x: 442,
    y: 274
  },
  WineryYard: {
    memo: "アージュワイナリー(果樹園)",
    accessible: () => true,
    x: 459,
    y: 293
  },
  ChickenRanch: {
    memo: "にわとりりあ",
    accessible: () => true,
    x: 548,
    y: 342
  },
  ChickenRanchPrivate: {
    memo: "にわとりりあ(2階)",
    accessible: () => true,
    x: 548,
    y: 340
  },
  Smith: {
    memo: "鍛冶屋サイバラ",
    accessible: () => true,
    x: 425,
    y: 275
  },
  MiscStore: {
    memo: "ザっか屋",
    accessible: () => true,
    x: 581,
    y: 93
  },
  MiscStorePrivate: {
    memo: "ザっか屋(奥)",
    accessible: () => true,
    x: 581,
    y: 93
  },
  Hospital: {
    memo: "病院",
    accessible: state => Characters.Doctor.place(state) === Places.Hospital,
    x: 666,
    y: 90
  },
  HospitalSecond: {
    memo: "病院(2階)",
    accessible: state => Places.Hospital.accessible(state),
    x: 650,
    y: 66
  },
  Library: {
    memo: "図書館",
    accessible: () => true,
    x: 408,
    y: 85
  },
  LibrarySecond: {
    memo: "図書館(2階)",
    accessible: () => true,
    x: 408,
    y: 65
  }
};
