/* eslint-disable @typescript-eslint/no-unused-vars */
import { stateDependent } from "@/store/sos_state";
import {
  Place,
  Places
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
        if (state.date.readableValue.hour < 7) return Places.Hotel;
        else if (state.date.readableValue.hour < 10) return Places.Fountain;
        else if (state.date.readableValue.hour < 13) return Places.HotelSecond;
        else if (state.date.readableValue.hour < 16) return Places.Hotel;
        else if (state.date.readableValue.hour < 19) return Places.HotelSecond;
        else if (state.date.readableValue.hour < 22) return Places.Hotel;
        else return Places.HotelPrivate;
      } else {
        if (state.date.readableValue.hour < 10) return Places.HotelPrivate;
        else if (state.date.readableValue.hour < 13) return Places.HotelSecond;
        else if (state.date.readableValue.hour < 16) return Places.Hotel;
        else if (state.date.readableValue.hour < 19) return Places.HotelSecond;
        else if (state.date.readableValue.hour < 22) return Places.Hotel;
        else return Places.HotelPrivate;
      }
    }
  },
  Anna: {
    name: "アンナ",
    url: require("@/assets/img/characters/anna.jpg"),
    place: state => {
      if (state.sunny) {
        if (state.date.readableValue.hour < 14) return Places.HouseBasil;
        else if (state.date.readableValue.hour < 16) return Places.Square;
        else return Places.HouseBasil;
      } else {
        return Places.HouseBasil;
      }
    }
  },
  Barley: {
    name: "ムギ",
    url: require("@/assets/img/characters/barley.jpg"),
    place: () => {
      return Places.YodelRanch;
    }
  },
  Basil: {
    name: "バジル",
    url: require("@/assets/img/characters/basil.jpg"),
    place: () => {
      return Places.HouseBasil;
    }
  }
};
