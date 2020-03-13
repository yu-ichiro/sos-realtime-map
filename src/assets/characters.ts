/* eslint-disable @typescript-eslint/no-unused-vars */
import { Seasons, stateDependent, Weekdays } from "@/store/sos_state";
import { Place, Places } from "@/assets/places";
import { DefaultedKey, immediate, wrap } from "@/util";

export interface Character {
  name: string;
  url: string;
  place: stateDependent<Place>;
}

const timeSwitch = (
  timeMapList: [number, stateDependent<Place>][]
): stateDependent<Place> => {
  const timeMap = new Map<number, stateDependent<Place>>(timeMapList);
  return state => {
    let currentHour = state.date.readableValue.hour;
    while (timeMap.get(currentHour) == null) {
      currentHour--;
      if (currentHour < 6) break;
    }
    return (timeMap.get(currentHour) ?? (() => Places.Nowhere))(state);
  };
};

const sunnySwitch = (
  weekdayMapList: [boolean, stateDependent<Place>][]
): stateDependent<Place> => {
  const sunnyMap = new Map<boolean, stateDependent<Place>>(weekdayMapList);
  return state => {
    return (sunnyMap.get(state.sunny) ?? (() => Places.Nowhere))(state);
  };
};

const weekdaySwitch = (
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

const seasonsSwitch = (
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

export const Characters: Record<string, Character> = {
  Ann: {
    name: "ラン",
    url: require("@/assets/img/characters/ann.jpg"),
    place: timeSwitch([
      [6, wrap(Places.HotelPrivate)],
      [
        7,
        sunnySwitch([
          [true, wrap(Places.Fountain)],
          [false, wrap(Places.HotelPrivate)]
        ])
      ],
      [10, wrap(Places.HotelSecond)],
      [13, wrap(Places.Hotel)],
      [16, wrap(Places.HotelSecond)],
      [19, wrap(Places.Hotel)],
      [22, wrap(Places.HotelPrivate)]
    ])
  },
  Anna: {
    name: "アンナ",
    url: require("@/assets/img/characters/anna.jpg"),
    place: timeSwitch([
      [6, wrap(Places.HouseBasil)],
      [
        7,
        sunnySwitch([
          [
            true,
            weekdaySwitch([
              ["Mon", wrap(Places.MountainMiddle)],
              ["default", wrap(Places.HouseBasil)]
            ])
          ],
          [false, wrap(Places.HouseBasil)]
        ])
      ],
      [10, wrap(Places.HouseBasil)],
      [
        13,
        sunnySwitch([
          [
            true,
            weekdaySwitch([
              ["Mon", wrap(Places.MiscStore)],
              ["default", wrap(Places.Square)]
            ])
          ],
          [false, wrap(Places.HouseBasil)]
        ])
      ],
      [16, wrap(Places.HouseBasil)],
      [22, wrap(Places.HouseBasilSecond)]
    ])
  },
  Barley: {
    name: "ムギ",
    url: require("@/assets/img/characters/barley.jpg"),
    place: timeSwitch([
      [6, wrap(Places.YodelRanch)],
      [
        8,
        weekdaySwitch([
          ["Mon", wrap(Places.HouseTomas)],
          ["default", wrap(Places.YodelRanchFirst)]
        ])
      ],
      [
        13,
        weekdaySwitch([
          [
            "Mon",
            sunnySwitch([
              [true, wrap(Places.HotSpring)],
              [false, wrap(Places.YodelRanchFirst)]
            ])
          ],
          ["default", wrap(Places.YodelRanchFirst)]
        ])
      ],
      [
        16,
        weekdaySwitch([
          [
            "Mon",
            sunnySwitch([
              [true, wrap(Places.YodelRanchFirst)],
              [false, wrap(Places.YodelRanchSecond)]
            ])
          ],
          ["default", wrap(Places.YodelRanchFirst)]
        ])
      ],
      [19, wrap(Places.YodelRanchSecond)]
    ])
  },
  Basil: {
    name: "バジル",
    url: require("@/assets/img/characters/basil.jpg"),
    place: timeSwitch([
      [6, wrap(Places.HouseBasilSecond)],
      [
        7,
        weekdaySwitch([
          [
            "Mon",
            sunnySwitch([
              [true, wrap(Places.MountainMiddle)],
              [false, wrap(Places.HouseBasil)]
            ])
          ],
          ["default", wrap(Places.HouseBasil)]
        ])
      ],
      [10, wrap(Places.HouseBasil)],
      [13, wrap(Places.HouseBasilSecond)],
      [16, wrap(Places.HouseBasil)],
      [19, wrap(Places.Hotel)],
      [22, wrap(Places.HouseBasilSecond)]
    ])
  },
  Carter: {
    name: "カーター",
    url: require("@/assets/img/characters/carter.jpg"),
    place: state => {
      const insideChurch = timeSwitch([
        [6, wrap(Places.ChurchGrave)],
        [9, wrap(Places.Church)],
        [13, wrap(Places.ChurchConfession)],
        [16, wrap(Places.Church)]
      ]);
      const outsideChurch = timeSwitch([
        [6, wrap(Places.ChurchGrave)],
        [9, wrap(Places.Church)],
        [13, wrap(Places.ChurchFront)],
        [16, wrap(Places.Church)]
      ]);
      const weekday = state.date.readableValue.weekday;
      if (!state.sunny || weekday === "Mon" || weekday === "Wed")
        return insideChurch(state);
      else return outsideChurch(state);
    }
  },
  Cliff: {
    name: "クリフ",
    url: require("@/assets/img/characters/cliff.jpg"),
    place: state => {
      if (
        immediate(
          false
        ) /* TODO: イベント実装時にクリフのバイト判定をstateに入れる */
      ) {
        return timeSwitch([
          [6, wrap(Places.HotelSecond)],
          [9, wrap(Places.Church)],
          [16, wrap(Places.HotelSecond)]
        ])(state);
      } else {
        const noWork = timeSwitch([
          [6, wrap(Places.HotelSecond)],
          [13, wrap(Places.Hotel)],
          [17, wrap(Places.Church)],
          [20, wrap(Places.HotelSecond)]
        ]);
        const work = timeSwitch([
          [6, wrap(Places.HotelSecond)],
          [9, wrap(Places.WineryBase)],
          [13, wrap(Places.WineryYard)],
          [17, wrap(Places.Church)],
          [20, wrap(Places.HotelSecond)]
        ]);
        if (state.sunny) {
          return weekdaySwitch([
            ["default", work],
            ["Sat", noWork]
          ])(state);
        } else {
          return noWork(state);
        }
      }
    }
  },
  Doctor: {
    name: "ドクター",
    url: require("@/assets/img/characters/docter.jpg"),
    place: weekdaySwitch([
      [
        "default",
        timeSwitch([
          [6, wrap(Places.HospitalSecond)],
          [9, wrap(Places.Hospital)],
          [19, wrap(Places.HospitalSecond)]
        ])
      ],
      [
        "Wed",
        timeSwitch([
          [6, wrap(Places.HospitalSecond)],
          [
            7,
            sunnySwitch([
              [true, wrap(Places.HospitalSecond)],
              [false, wrap(Places.Church)]
            ])
          ],
          [
            8,
            sunnySwitch([
              [true, wrap(Places.Lake)],
              [false, wrap(Places.Church)]
            ])
          ],
          [
            10,
            sunnySwitch([
              [true, wrap(Places.Lake)],
              [false, wrap(Places.Hospital)]
            ])
          ],
          [11, wrap(Places.Hospital)],
          [13, wrap(Places.Library)],
          [16, wrap(Places.Hospital)],
          [22, wrap(Places.HospitalSecond)]
        ])
      ]
    ])
  }
};
