<template>
  <div class="calendar">
    <div class="season">
      <div
        class="background"
        :style="{
          'background-color': seasonColor(_sosDate.readableValue.season)
        }"
      ></div>
      <v-btn
        style="position: absolute; left: 30px; top: 20px; z-index: 5"
        :disabled="!canGoBack"
        @click="previousMonth"
        text
      >
        <v-icon>mdi-arrow-left-thick</v-icon>
      </v-btn>
      <v-btn
        style="position: absolute; right: 30px; top: 20px; z-index: 5"
        @click="nextMonth"
        text
      >
        <v-icon>mdi-arrow-right-thick</v-icon>
      </v-btn>
      <div class="year">{{ _sosDate.readableValue.year }}年目</div>
      <div class="text">
        {{ seasonName(_sosDate.readableValue.season) }}の月
      </div>
    </div>
    <div class="cell header sun">日</div>
    <div class="cell header">月</div>
    <div class="cell header">火</div>
    <div class="cell header">水</div>
    <div class="cell header">木</div>
    <div class="cell header">金</div>
    <div class="cell header sat">土</div>
    <div
      :class="{
        cell: true,
        empty: day.empty,
        today: day.today,
        sun: i % 7 === 0,
        sat: i % 7 === 6
      }"
      @click="clickDay(day)"
      v-for="(day, i) in calenderDays"
      :key="i"
    >
      <div class="date">{{ day.date }}</div>
      <div class="birthday" v-if="day.birthday"></div>
      <div class="event" v-if="day.event"></div>
    </div>
  </div>
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

  get calenderDays(): CalenderDay[] {
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
    return days;
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  display: flex;
  flex-wrap: wrap;
  background-color: #e3e6ca;
  border-radius: 20px;
  border: solid 3px #b1ae8a;
  padding: 20px;

  .season {
    flex: 1 0 100%;
    height: 70px;
    position: relative;
    border-radius: 10px;
    background-color: #b1ae8a;
    margin-bottom: 10px;
    z-index: 0;

    .background {
      position: relative;
      top: 0;
      width: 40%;
      height: 10px;
      margin: 40px auto 0 auto;
      border-radius: 5px;
      background-color: white;
      z-index: 1;
    }

    .year {
      position: absolute;
      margin: 10px 0;
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
      margin: 30px 0;
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

  .cell {
    height: 50px;
    position: relative;
    border-radius: 10px;
    margin: calc(0.13em + 0.04vw);
    flex: 1 0 calc(100% / 7 - 0.6em - 0.2vw);
    opacity: 0.5;
    color: #251411;
    background-color: #d18b17;
    padding: 10px 15px;
    font-size: calc(0.9em + 0.1vw);
    font-weight: bold;

    &.empty {
      color: transparent;
      background-color: transparent !important;
      border: solid 5px black;
      opacity: 0.3;

      &:hover {
        opacity: 0.3;
        cursor: initial;
      }
    }

    &.today {
      background-color: #6cda1e !important;
      opacity: 1;
    }

    &.sun {
      background-color: #c41f27;
    }

    &.sat {
      background-color: #2b91c4;
    }

    &.header {
      padding: 0;
      height: 36px;
      line-height: 36px;
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
