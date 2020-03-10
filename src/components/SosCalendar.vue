<template>
  <table class="calendar">
    <tr>
      <th class="season" colspan="7">
        <div
          class="background"
          :style="{
            'background-color': seasonColor(_sosDate.readableValue.season)
          }"
        ></div>
        <v-btn
          style="position: absolute; left: 0; top: 10px; z-index: 5"
          :disabled="!canGoBack"
          @click="previousMonth"
          text
        >
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>
        <v-btn
          style="position: absolute; right: 0; top: 10px; z-index: 5"
          @click="nextMonth"
          text
        >
          <v-icon>mdi-arrow-right-thick</v-icon>
        </v-btn>
        <div class="year">{{ _sosDate.readableValue.year }}年目</div>
        <div class="text">
          {{ seasonName(_sosDate.readableValue.season) }}の月
        </div>
      </th>
    </tr>
    <tr>
      <th class="header sun">日</th>
      <th class="header">月</th>
      <th class="header">火</th>
      <th class="header">水</th>
      <th class="header">木</th>
      <th class="header">金</th>
      <th class="header sat">土</th>
    </tr>
    <tr v-for="(row, i) in calenderDays" :key="i">
      <td
        :class="{
          empty: day.empty,
          today: day.today,
          sun: i % 7 === 0,
          sat: i % 7 === 6
        }"
        @click="clickDay(day)"
        v-for="(day, i) in row"
        :key="i"
      >
        <div class="date">{{ day.date }}</div>
        <div class="birthday" v-if="day.birthday"></div>
        <div class="event" v-if="day.event"></div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import { Seasons, SosDate, sosStateModule, Weekdays } from "@/store/sos_state";

type CalenderDay = {
  date: number;
  empty: boolean;
  today: boolean;
  birthday: boolean;
  event: boolean;
};

@Component
export default class SosCalender extends Vue {
  @Model("update:sosDate", { type: SosDate })
  sosDate!: SosDate;

  innerSosDate: SosDate = new SosDate(sosStateModule.date.value);

  get _sosDate(): SosDate {
    return this.sosDate ?? this.innerSosDate;
  }

  set _sosDate(val: SosDate) {
    this.innerSosDate = val;
    this.$emit("update:sosDate", val);
  }

  get canGoBack(): boolean {
    return this._sosDate.value >= SosDate.month;
  }

  clickDay(day: CalenderDay) {
    if (day.today || day.empty) return;
    this._sosDate = this._sosDate.replaced({ day: day.date });
  }

  nextMonth() {
    this._sosDate = new SosDate(this._sosDate.value + SosDate.month);
  }

  previousMonth() {
    if (!this.canGoBack) return;
    this._sosDate = new SosDate(this._sosDate.value - SosDate.month);
  }

  seasonName(season: keyof typeof Seasons) {
    if (season == "Spring") return "はる";
    if (season == "Summer") return "なつ";
    if (season == "Autumn") return "あき";
    if (season == "Winter") return "ふゆ";
    throw new Error("Unreachable");
  }

  seasonColor(season: keyof typeof Seasons) {
    if (season == "Spring") return "#c80a56";
    if (season == "Summer") return "#29940a";
    if (season == "Autumn") return "#b95c1f";
    if (season == "Winter") return "#2870c5";
    throw new Error("Unreachable");
  }

  get calenderDays(): CalenderDay[][] {
    const firstDay = this._sosDate.replaced({ day: 1 }).readableValue;
    const lastDay = this._sosDate.replaced({ day: 30 }).readableValue;
    const days: CalenderDay[] = [];
    for (let i = Weekdays[firstDay.weekday]; i > 0; i--)
      days.push({
        date: 31 - i,
        empty: true,
        birthday: false,
        event: false,
        today: false
      });
    for (let i = 1; i <= 30; i++)
      days.push({
        date: i,
        empty: false,
        birthday: false,
        event: false,
        today: i == this._sosDate.readableValue.day
      });
    for (let i = 1; i < 7 - Weekdays[lastDay.weekday]; i++)
      days.push({
        date: i,
        empty: true,
        birthday: false,
        event: false,
        today: false
      });
    while (days.length < 42)
      days.push({
        date: days[days.length - 1].date + 1,
        empty: true,
        birthday: false,
        event: false,
        today: false
      });
    return days.reduce<CalenderDay[][]>((acc, day, idx) => {
      const row = Math.floor(idx / 7);
      if (acc.length <= row) acc.push([]);
      acc[row].push(day);
      return acc;
    }, []);
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  max-width: 672px;
  max-height: 510px;
  width: 100%;
  height: calc(100vw / 672 * 510);
  background-color: #e3e6ca;
  border-radius: 20px;
  border: solid 3px #b1ae8a;
  border-spacing: 4px;
  padding: calc(10px + 1vw);

  .season {
    opacity: 1;
    height: 3em;
    position: relative;
    border-radius: 10px;
    border: solid 5px #b1ae8a;
    background-color: #b1ae8a;
    margin-bottom: 10px;
    z-index: 0;

    &:hover {
      cursor: initial;
    }

    .background {
      position: relative;
      top: 0;
      width: 50%;
      height: 10px;
      margin: 35px auto 5px auto;
      border-radius: 5px;
      background-color: white;
      z-index: 1;
    }

    .year {
      position: absolute;
      margin: 5px 0;
      top: 0;
      left: 0;
      width: 100%;
      line-height: 100%;
      color: #541a01;
      font-weight: bold;
      font-size: 1em;
      text-align: center;
      z-index: 2;
    }

    .text {
      position: absolute;
      margin: 20px 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 30px;
      line-height: 100%;
      text-align: center;
      font-size: 2em;
      font-weight: 900;
      color: white;
      -webkit-text-stroke: 1.7px #541a01;
      z-index: 2;
    }
  }

  th,
  td {
    position: relative;
    border-radius: 10px;
    margin: calc(0.13em + 0.04vw);
    opacity: 0.5;
    color: #251411;
    border: solid 5px #d18b17;
    background-color: #d18b17;
    font-size: calc(0.9em + 0.1vw);
    font-weight: bold;

    &.empty {
      color: transparent;
      background-color: transparent !important;
      border: solid 5px black !important;
      opacity: 0.3;

      &:hover {
        opacity: 0.3;
        cursor: initial;
      }
    }

    &.today {
      border: solid 5px lighten(#6cda1e, 40) !important;
      background-color: #6cda1e !important;
      opacity: 1;
    }

    &.sun {
      border: solid 5px #c41f27;
      background-color: #c41f27;
    }

    &.sat {
      border: solid 5px #2b91c4;
      background-color: #2b91c4;
    }

    &.header {
      height: 36px;
      padding: 0;
      line-height: 26px;
      color: white;
      border-radius: 10px;
      text-align: center;
      opacity: 1;
    }

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
}
</style>
