/* eslint-disable @typescript-eslint/no-unused-vars */
import { stateCondition } from "@/store/sos_state";

export interface Place {
  memo: string;
  accessible: stateCondition;
  x: number;
  y: number;
}

export const Nowhere: Place = {
  memo: "不明",
  accessible: () => false,
  x: -10000,
  y: -10000
};

export const MyRanch: Place = {
  memo: "牧場",
  accessible: () => true,
  x: 385,
  y: 405
};

export const ChickenRanch: Place = {
  memo: "にわとりりあ",
  accessible: () => true,
  x: 548,
  y: 342
};

export const ChickenRanchPrivate: Place = {
  memo: "にわとりりあ(2階)",
  accessible: () => true,
  x: 548,
  y: 340
};

export const Smith: Place = {
  memo: "鍛冶屋サイバラ",
  accessible: () => true,
  x: 425,
  y: 275
};

export const MiscStore: Place = {
  memo: "ザっか屋",
  accessible: () => true,
  x: 581,
  y: 93
};

export const MiscStorePrivate: Place = {
  memo: "ザっか屋(奥)",
  accessible: () => true,
  x: 581,
  y: 93
};

export const Hotel: Place = {
  memo: "ダッドの店",
  accessible: () => true,
  x: 560,
  y: 174
};

export const HotelPrivate: Place = {
  memo: "ダッドの店(奥)",
  accessible: () => true,
  x: 560,
  y: 147
};

export const HotelSecond: Place = {
  memo: "ダッドの店(２階)",
  accessible: () => true,
  x: 560,
  y: 160
};

export const Fountain: Place = {
  memo: "泉周辺",
  accessible: () => true,
  x: 242,
  y: 360
};

export const Square: Place = {
  memo: "広場",
  accessible: () => true,
  x: 784,
  y: 252
};

export const HouseBasil: Place = {
  memo: "バジルの家",
  accessible: () => true,
  x: 377,
  y: 82
};

export const YodelRanch: Place = {
  memo: "ヨーデル牧場",
  accessible: () => true,
  x: 685,
  y: 350
};

export const YodelRanchYard: Place = {
  memo: "ヨーデル牧場(庭)",
  accessible: () => true,
  x: 638,
  y: 338
};

export const Places: Record<string, Place> = {
  Nowhere: Nowhere,
  MyRanch: MyRanch,
  ChickenRanch: ChickenRanch,
  ChickenRanchPrivate: ChickenRanchPrivate,
  Smith: Smith,
  MiscStore: MiscStore,
  MiscStorePrivate: MiscStorePrivate,
  Hotel: Hotel,
  HotelPrivate: HotelPrivate,
  HotelSecond: HotelSecond,
  Fountain: Fountain,
  Square: Square,
  HouseBasil: HouseBasil,
  YodelRanch: YodelRanch,
  YodelRanchYard: YodelRanchYard
}

