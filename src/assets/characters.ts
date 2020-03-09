/* eslint-disable @typescript-eslint/no-unused-vars */
import { stateDependent } from "@/store/sos_state";
import {
  Fountain,
  Hotel,
  HotelPrivate,
  HotelSecond,
  HouseBasil,
  Place,
  Square,
  YodelRanch
} from "@/assets/places";

export interface Character {
  name: string;
  url: string;
  place: stateDependent<Place>;
}

export const Characters: Record<string, Character> = {
  Ann: {
    name: "ラン",
    url: require("@/assets/img/characters/ann.jpg"),
    place: state => {
      if (state.sunny) {
        if (state.date.readableValue.hour < 7) return Hotel;
        else if (state.date.readableValue.hour < 10) return Fountain;
        else if (state.date.readableValue.hour < 13) return HotelSecond;
        else if (state.date.readableValue.hour < 16) return Hotel;
        else if (state.date.readableValue.hour < 19) return HotelSecond;
        else if (state.date.readableValue.hour < 22) return Hotel;
        else return HotelPrivate;
      } else {
        if (state.date.readableValue.hour < 10) return HotelPrivate;
        else if (state.date.readableValue.hour < 13) return HotelSecond;
        else if (state.date.readableValue.hour < 16) return Hotel;
        else if (state.date.readableValue.hour < 19) return HotelSecond;
        else if (state.date.readableValue.hour < 22) return Hotel;
        else return HotelPrivate;
      }
    }
  },
  Anna: {
    name: "アンナ",
    url: require("@/assets/img/characters/anna.jpg"),
    place: state => {
      if (state.sunny) {
        if (state.date.readableValue.hour < 14) return HouseBasil;
        else if (state.date.readableValue.hour < 16) return Square;
        else return HouseBasil;
      } else {
        return HouseBasil;
      }
    }
  },
  Barley: {
    name: "ムギ",
    url: require("@/assets/img/characters/barley.jpg"),
    place: () => {
      return YodelRanch;
    }
  },
  Basil: {
    name: "バジル",
    url: require("@/assets/img/characters/basil.jpg"),
    place: () => {
      return HouseBasil;
    }
  }
};
