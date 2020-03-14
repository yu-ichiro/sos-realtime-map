/* eslint-disable @typescript-eslint/no-unused-vars */
import { stateCondition } from "@/store/sos_state";
import { Characters } from "@/assets/characters";
import { MapObject } from "@/util";

export type Vector = [number, number];

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
  name: string;
  accessible: stateCondition;
  x: number;
  y: number;
}

export interface Checkpoint {
  x: number;
  y: number;
}

export const Places: MapObject<Place> = {};
Places.Nowhere = {
  name: "不明",
  accessible: () => false,
  x: -10000,
  y: -10000
};
Places.MyRanch = {
  name: "牧場",
  accessible: () => true,
  x: 385,
  y: 405
};
Places.MountainMiddle = {
  name: "裏山(中腹)",
  accessible: () => true,
  x: 98,
  y: 230
};
Places.Fountain = {
  name: "泉周辺",
  accessible: () => true,
  x: 242,
  y: 360
};
Places.Lake = {
  name: "湖周辺",
  accessible: () => true,
  x: 87,
  y: 457
};
Places.HotSpring = {
  name: "温泉",
  accessible: () => true,
  x: 221,
  y: 442
};
Places.Square = {
  name: "広場",
  accessible: () => true,
  x: 784,
  y: 252
};
Places.Church = {
  name: "教会",
  accessible: () => true,
  x: 783,
  y: 93
};
Places.ChurchGrave = {
  name: "教会墓地",
  accessible: () => true,
  x: 729,
  y: 87
};
Places.ChurchFront = {
  name: "教会前",
  accessible: () => true,
  x: 765,
  y: 106
};
Places.ChurchConfession = {
  name: "教会(懺悔室)",
  accessible: state =>
    Characters.Carter.place(state) === Places.ChurchConfession,
  x: 758,
  y: 61
};
Places.Hotel = {
  name: "ダッドの店",
  accessible: () => true,
  x: 560,
  y: 174
};
Places.HotelPrivate = {
  name: "ダッドの店(奥)",
  accessible: () => false,
  x: 576,
  y: 151
};
Places.HotelSecond = {
  name: "ダッドの店(２階)",
  accessible: () => true,
  x: 536,
  y: 146
};
Places.HouseBasil = {
  name: "バジルの家",
  accessible: state =>
    Characters.Anna.place(state) === Places.HouseBasil ||
    Characters.Basil.place(state) === Places.HouseBasil,
  x: 377,
  y: 82
};
Places.HouseBasilSecond = {
  name: "バジルの家(2階)",
  accessible: Places.HouseBasil.accessible,
  x: 388,
  y: 59
};
Places.YodelRanch = {
  name: "ヨーデル牧場",
  accessible: () => true,
  x: 711,
  y: 381
};
Places.YodelRanchFirst = {
  name: "ヨーデル牧場(1階)",
  accessible: () => true,
  x: 685,
  y: 350
};
Places.YodelRanchSecond = {
  name: "ヨーデル牧場(2階)",
  accessible: () => false,
  x: 701,
  y: 322
};
Places.YodelRanchYard = {
  name: "ヨーデル牧場(庭)",
  accessible: () => true,
  x: 638,
  y: 338
};
Places.HouseTomas = {
  name: "町長の家",
  accessible: () => true,
  x: 490,
  y: 83
};
Places.Winery = {
  name: "アージュワイナリー",
  accessible: () => true,
  x: 394,
  y: 155
};
Places.WinerySecond = {
  name: "アージュワイナリー(2階)",
  accessible: () => false,
  x: 414,
  y: 133
};
Places.WineryBase = {
  name: "アージュワイナリー(貯蔵庫)",
  accessible: () => true,
  x: 440,
  y: 153
};
Places.WineryYard = {
  name: "アージュワイナリー(果樹園)",
  accessible: () => true,
  x: 470,
  y: 173
};
Places.ChickenRanch = {
  name: "にわとりりあ",
  accessible: () => true,
  x: 548,
  y: 342
};
Places.ChickenRanchPrivate = {
  name: "にわとりりあ(2階)",
  accessible: () => true,
  x: 548,
  y: 340
};
Places.Smith = {
  name: "鍛冶屋サイバラ",
  accessible: () => true,
  x: 425,
  y: 275
};
Places.MiscStore = {
  name: "ザっか屋",
  accessible: () => true,
  x: 581,
  y: 93
};
Places.MiscStorePrivate = {
  name: "ザっか屋(奥)",
  accessible: () => true,
  x: 581,
  y: 93
};
Places.Hospital = {
  name: "病院",
  accessible: state => Characters.Doctor.place(state) === Places.Hospital,
  x: 666,
  y: 90
};
Places.HospitalSecond = {
  name: "病院(2階)",
  accessible: state => Places.Hospital.accessible(state),
  x: 650,
  y: 66
};
Places.Library = {
  name: "図書館",
  accessible: () => true,
  x: 408,
  y: 85
};
Places.LibrarySecond = {
  name: "図書館(2階)",
  accessible: () => true,
  x: 408,
  y: 65
};

// noinspection JSUnusedLocalSymbols
const Checkpoints: MapObject<string | MapObject<Checkpoint>> = {};
