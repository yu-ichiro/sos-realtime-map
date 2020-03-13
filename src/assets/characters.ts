/* eslint-disable @typescript-eslint/no-unused-vars */
import { stateDependent } from "@/store/sos_state";
import { Place, Places } from "@/assets/places";

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
        if (state.date.readableValue.hour < 7) return Places.HotelPrivate;
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
      if (state.date.readableValue.hour < 7) return Places.HouseBasil;
      else if (state.date.readableValue.hour < 10) {
        if (state.date.readableValue.weekday === "Mon" && state.sunny)
          return Places.MountainMiddle;
        else return Places.HouseBasil;
      } else if (state.date.readableValue.hour < 13) return Places.HouseBasil;
      else if (state.date.readableValue.hour < 16) {
        if (state.date.readableValue.weekday === "Mon") return Places.MiscStore;
        else if (state.sunny) return Places.Square;
      } else if (state.date.readableValue.hour < 22) return Places.HouseBasil;
      return Places.HouseBasilSecond;
    }
  },
  Barley: {
    name: "ムギ",
    url: require("@/assets/img/characters/barley.jpg"),
    place: state => {
      if (state.date.readableValue.hour < 8) return Places.YodelRanch;
      else if (state.date.readableValue.hour < 13)
        if (state.date.readableValue.weekday === "Mon")
          return Places.HouseTomas;
        else return Places.YodelRanchFirst;
      else if (state.date.readableValue.hour < 16)
        if (state.date.readableValue.weekday === "Mon" && state.sunny)
          return Places.HotSpring;
        else return Places.YodelRanchFirst;
      else if (state.date.readableValue.hour < 19)
        if (state.date.readableValue.weekday === "Mon" && !state.sunny)
          return Places.YodelRanchSecond;
        else return Places.YodelRanchFirst;
      return Places.YodelRanchSecond;
    }
  },
  Basil: {
    name: "バジル",
    url: require("@/assets/img/characters/basil.jpg"),
    place: state => {
      if (state.date.readableValue.hour < 7) return Places.HouseBasilSecond;
      else if (state.date.readableValue.hour < 10) {
        if (state.date.readableValue.weekday === "Mon" && state.sunny)
          return Places.MountainMiddle;
        else return Places.HouseBasil;
      } else if (state.date.readableValue.hour < 13) return Places.HouseBasil;
      else if (state.date.readableValue.hour < 16)
        return Places.HouseBasilSecond;
      else if (state.date.readableValue.hour < 19) return Places.HouseBasil;
      else if (state.date.readableValue.hour < 22) return Places.Hotel;
      return Places.HouseBasilSecond;
    }
  },
  Carter: {
    name: "カーター",
    url: require("@/assets/img/characters/carter.jpg"),
    place: state => {
      if (state.date.readableValue.hour < 9) return Places.ChurchGrave;
      else if (state.date.readableValue.hour < 13) return Places.Church;
      else if (state.date.readableValue.hour < 16)
        if (
          state.date.readableValue.weekday === "Mon" ||
          state.date.readableValue.weekday === "Wed" ||
          !state.sunny
        )
          return Places.ChurchConfession;
        else return Places.ChurchFront;
      return Places.Church;
    }
  },
  Cliff: {
    name: "クリフ",
    url: require("@/assets/img/characters/cliff.jpg"),
    place: state => {
      if ((() => false)() /* TODO: イベント実装時にクリフのバイト判定をstateに入れる */) {
        if (state.date.readableValue.hour < 9) return Places.HotelSecond;
        else if (state.date.readableValue.hour < 16) return Places.Church;
        return Places.HotelSecond;
      } else {
        if (state.sunny && state.date.readableValue.weekday !== "Sat") {
          if (state.date.readableValue.hour < 9) return Places.HotelSecond;
          else if (state.date.readableValue.hour < 13) return Places.WineryBase;
          else if (state.date.readableValue.hour < 17) return Places.WineryYard;
          else if (state.date.readableValue.hour < 20) return Places.Church;
          return Places.HotelSecond;
        } else {
          if (state.date.readableValue.hour < 13) return Places.HotelSecond;
          else if (state.date.readableValue.hour < 17) return Places.Hotel;
          else if (state.date.readableValue.hour < 20) return Places.Church;
          return Places.HotelSecond;
        }
      }
    }
  }
};
