/* eslint-disable @typescript-eslint/no-unused-vars */
import { stateDependent } from "@/store/sos_state";
import { Place, Places } from "@/assets/places";
import { wrap } from "@/util";
import {
  andCondition,
  booleanSwitch,
  hourSwitch,
  isSunny,
  isWeekday,
  notCondition,
  orCondition,
  sunnySwitch,
  weekdaySwitch
} from "@/store/util/state_dependents";
import { eventDone, SosEvent } from "@/assets/events";

export interface Character {
  name: string;
  url: string;
  place: stateDependent<Place>;
  events: Record<string, SosEvent>;
}

export const Characters: { [key: string]: Character } = {};
Characters.Ann = {
  name: "ラン",
  url: require("@/assets/img/characters/ann.jpg"),
  events: {},
  place: hourSwitch([
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
};
Characters.Anna = {
  name: "アンナ",
  url: require("@/assets/img/characters/anna.jpg"),
  events: {},
  place: hourSwitch([
    [6, wrap(Places.HouseBasil)],
    [
      7,
      booleanSwitch(andCondition(isSunny, isWeekday("Mon")), [
        [true, wrap(Places.MountainMiddle)],
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
};
Characters.Barley = {
  name: "ムギ",
  url: require("@/assets/img/characters/barley.jpg"),
  events: {},
  place: hourSwitch([
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
      booleanSwitch(andCondition(isSunny, isWeekday("Mon")), [
        [true, wrap(Places.HotSpring)],
        [false, wrap(Places.YodelRanchFirst)]
      ])
    ],
    [
      16,
      booleanSwitch(andCondition(notCondition(isSunny), isWeekday("Mon")), [
        [true, wrap(Places.YodelRanchSecond)],
        [false, wrap(Places.YodelRanchFirst)]
      ])
    ],
    [19, wrap(Places.YodelRanchSecond)]
  ])
};
Characters.Basil = {
  name: "バジル",
  url: require("@/assets/img/characters/basil.jpg"),
  events: {},
  place: hourSwitch([
    [6, wrap(Places.HouseBasilSecond)],
    [
      7,
      booleanSwitch(andCondition(isSunny, isWeekday("Mon")), [
        [true, wrap(Places.MountainMiddle)],
        [false, wrap(Places.HouseBasil)]
      ])
    ],
    [10, wrap(Places.HouseBasil)],
    [13, wrap(Places.HouseBasilSecond)],
    [16, wrap(Places.HouseBasil)],
    [19, wrap(Places.Hotel)],
    [22, wrap(Places.HouseBasilSecond)]
  ])
};
Characters.Carter = {
  name: "カーター",
  url: require("@/assets/img/characters/carter.jpg"),
  events: {},
  place: hourSwitch([
    [6, wrap(Places.ChurchGrave)],
    [9, wrap(Places.Church)],
    [
      13,
      booleanSwitch(
        orCondition(notCondition(isSunny), isWeekday("Mon"), isWeekday("Wed")),
        [
          [true, wrap(Places.ChurchConfession)],
          [false, wrap(Places.ChurchFront)]
        ]
      )
    ],
    [16, wrap(Places.Church)]
  ])
};
Characters.Cliff = {
  name: "クリフ",
  url: require("@/assets/img/characters/cliff.jpg"),
  events: {
    Work: {
      name: "クリフとアルバイト",
      ready: wrap(false)
    }
  },
  place: booleanSwitch(
    eventDone(Characters.Cliff.events.Work),
    [
      [
        false,
        hourSwitch([
          [6, wrap(Places.HotelSecond)],
          [9, wrap(Places.Church)],
          [16, wrap(Places.HotelSecond)]
        ])
      ],
      [
        true,
        booleanSwitch(andCondition(isSunny, notCondition(isWeekday("Sat"))), [
          [
            true,
            hourSwitch([
              [6, wrap(Places.HotelSecond)],
              [9, wrap(Places.WineryBase)],
              [13, wrap(Places.WineryYard)],
              [17, wrap(Places.Church)],
              [20, wrap(Places.HotelSecond)]
            ])
          ],
          [
            false,
            hourSwitch([
              [6, wrap(Places.HotelSecond)],
              [13, wrap(Places.Hotel)],
              [17, wrap(Places.Church)],
              [20, wrap(Places.HotelSecond)]
            ])
          ]
        ])
      ]
    ]
  )
};
Characters.Doctor = {
  name: "ドクター",
  url: require("@/assets/img/characters/docter.jpg"),
  events: {},
  place: weekdaySwitch([
    [
      "default",
      hourSwitch([
        [6, wrap(Places.HospitalSecond)],
        [9, wrap(Places.Hospital)],
        [19, wrap(Places.HospitalSecond)]
      ])
    ],
    [
      "Wed",
      sunnySwitch([
        [
          true,
          hourSwitch([
            [6, wrap(Places.HospitalSecond)],
            [8, wrap(Places.Lake)],
            [11, wrap(Places.Hospital)],
            [13, wrap(Places.LibrarySecond)],
            [16, wrap(Places.Hospital)],
            [22, wrap(Places.HospitalSecond)]
          ])
        ],
        [
          false,
          hourSwitch([
            [6, wrap(Places.HospitalSecond)],
            [7, wrap(Places.Church)],
            [10, wrap(Places.Hospital)],
            [13, wrap(Places.LibrarySecond)],
            [16, wrap(Places.Hospital)],
            [22, wrap(Places.HospitalSecond)]
          ])
        ]
      ])
    ]
  ])
};
Characters.Doug = {
  name: "ダッド",
  url: require("@/assets/img/characters/doug.jpg"),
  events: {},
  place: hourSwitch([
    [6, wrap(Places.HotelPrivate)],
    [8, wrap(Places.Hotel)],
    [13, wrap(Places.HotelPrivate)],
    [15, wrap(Places.Hotel)],
    [19, wrap(Places.HotelPrivate)],
    [21, wrap(Places.Hotel)]
  ])
};
Characters.Duke = {
  name: "デューク",
  url: require("@/assets/img/characters/duke.jpg"),
  events: {},
  place: booleanSwitch(
    eventDone(Characters.Cliff.events.Work),
    [
      [
        false,
        weekdaySwitch([
          [
            "default",
            hourSwitch([
              [6, wrap(Places.WinerySecond)],
              [7, wrap(Places.Winery)],
              [10, wrap(Places.WineryBase)],
              [14, wrap(Places.WineryYard)],
              [17, wrap(Places.Winery)],
              [19, wrap(Places.Hotel)],
              [22, wrap(Places.WinerySecond)]
            ])
          ],
          [
            "Sat",
            hourSwitch([
              [6, wrap(Places.WinerySecond)],
              [7, wrap(Places.Winery)],
              [13, wrap(Places.Hotel)],
              [14, wrap(Places.Winery)],
              [22, wrap(Places.WinerySecond)]
            ])
          ]
        ])
      ],
      [
        true,
        weekdaySwitch([
          [
            "default",
            hourSwitch([
              [6, wrap(Places.WinerySecond)],
              [7, wrap(Places.Winery)],
              [13, wrap(Places.WineryBase)],
              [15, wrap(Places.WineryYard)],
              [17, wrap(Places.Winery)],
              [19, wrap(Places.Hotel)],
              [22, wrap(Places.WinerySecond)]
            ])
          ],
          [
            "Sat",
            hourSwitch([
              [6, wrap(Places.WinerySecond)],
              [7, wrap(Places.Winery)],
              [13, wrap(Places.Hotel)],
              [16, wrap(Places.Church)],
              [19, wrap(Places.Winery)],
              [22, wrap(Places.WinerySecond)]
            ])
          ]
        ])
      ]
    ]
  )
};
