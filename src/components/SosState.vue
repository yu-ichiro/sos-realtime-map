<template>
  <v-dialog v-model="edit" max-width="720px">
    <template #activator="{ on }">
      <v-card class="action-panel">
        <v-btn v-on="on" text>
          <span>
            <span :style="{ color: seasonColor(globalDate.season) }">{{
              seasonName(globalDate.season)
            }}</span
            >の月</span
          >
          <span>
            {{ globalDate.day }}日 ({{ weekdayName(globalDate.weekday) }})
          </span>
        </v-btn>
        <br />
        <v-btn text small @click="toggleWeather"
          ><v-icon>{{ weatherIcon(globalState) }}</v-icon>
        </v-btn>
        <v-btn text small @click="decrement" :disabled="!canGoBack">
          <v-icon>mdi-arrow-left-thick</v-icon>
        </v-btn>
        <v-btn
          text
          small
          @click="auto = !auto"
          :color="auto ? 'primary' : 'normal'"
        >
          {{ zeroPad(globalDate.hour) }}:{{ zeroPad(globalDate.minute) }}
        </v-btn>
        <v-btn text small @click="increment">
          <v-icon>mdi-arrow-right-thick</v-icon>
        </v-btn>
      </v-card>
    </template>
    <v-card>
      <v-card-title class="headline"></v-card-title>
      <v-card-text>
        <sos-calendar v-if="edit" v-model="localState.date" />
        <v-select :items="hours" v-model="localHour" label="時" />
        <v-select :items="minutes" v-model="localMinute" label="分" />
        <v-btn-toggle mandatory v-model="localSunny">
          <v-btn>
            <v-icon>
              {{ weatherIcon(Object.assign({}, localState, { sunny: true })) }}
            </v-icon>
          </v-btn>
          <v-btn>
            <v-icon>
              {{ weatherIcon(Object.assign({}, localState, { sunny: false })) }}
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" outlined @click="edit = false">
          Cancel
        </v-btn>
        <v-btn color="primary" outlined @click="update">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  Seasons,
  Weekdays,
  sosStateModule,
  SosDateReadableValue,
  SosStateInterface,
  SosDate
} from "@/store/sos_state";
import SosCalendar from "@/components/SosCalendar.vue";
@Component({
  components: { SosCalendar }
})
export default class SosState extends Vue {
  edit = false;
  interval = -1;

  localState: SosStateInterface = {
    date: new SosDate(),
    sunny: true
  };

  get auto(): boolean {
    return this.interval !== -1;
  }

  set auto(val: boolean) {
    if (val) {
      this.interval = setInterval(sosStateModule.increment, 5000);
    } else {
      clearInterval(this.interval as number);
      this.interval = -1;
    }
  }

  increment() {
    sosStateModule.increment();
  }

  get canGoBack(): boolean {
    return this.globalState.date.value >= 10 * SosDate.minute;
  }

  decrement() {
    if (!this.canGoBack) return;
    sosStateModule.decrement();
  }

  toggleWeather() {
    sosStateModule.setSunnyState(!this.globalState.sunny);
  }

  get localDateState(): SosDateReadableValue {
    return this.localState.date.readableValue;
  }

  set localDateState(readableValue: SosDateReadableValue) {
    this.localState.date = this.localState.date.replaced(readableValue);
  }

  get localHour(): number {
    return this.localDateState.hour;
  }

  set localHour(hour: number) {
    this.localDateState = Object.assign(this.localDateState, { hour: hour });
  }

  get localMinute(): number {
    return this.localDateState.minute;
  }

  set localMinute(minute: number) {
    this.localDateState = Object.assign(this.localDateState, {
      minute: minute
    });
  }

  get localSunny(): number {
    return this.localState.sunny ? 0 : 1;
  }

  set localSunny(sunny: number) {
    this.localState.sunny = sunny === 0;
  }

  @Watch("edit")
  onEditChange() {
    this.localState = Object.assign(Object.create(null), this.globalState);
  }

  get globalState(): SosStateInterface {
    return {
      date: sosStateModule.date,
      sunny: sosStateModule.sunny
    };
  }

  update() {
    sosStateModule.replaceDateState(this.localState.date.readableValue);
    sosStateModule.setSunnyState(this.localState.sunny);
    this.edit = false;
  }

  zeroPad(num: number): string {
    return ("00" + String(num)).slice(-2);
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

  weatherIcon(state: SosStateInterface): string {
    if (state.sunny) return "mdi-weather-sunny";
    else if (state.date.readableValue.season == "Winter")
      return "mdi-weather-snowy";
    else return "mdi-weather-pouring";
  }

  weekdayName(season: keyof typeof Weekdays) {
    if (season == "Sun") return "日";
    if (season == "Mon") return "月";
    if (season == "Tue") return "火";
    if (season == "Wed") return "水";
    if (season == "Thr") return "木";
    if (season == "Fri") return "金";
    if (season == "Sat") return "土";
    throw new Error("Unreachable");
  }

  get globalDate(): SosDateReadableValue {
    return this.globalState.date.readableValue;
  }

  // form
  get seasonTable() {
    const table = [];
    for (const key in Seasons) {
      if (!isNaN(Number(key))) continue;
      table.push({
        value: key,
        text: this.seasonName(key as keyof typeof Seasons)
      });
    }
    return table;
  }

  get days(): number[] {
    return new Array(30).fill(null).map((_, i) => i + 1);
  }

  get hours(): number[] {
    return new Array(24).fill(null).map((_, i) => i + 6);
  }

  get minutes(): number[] {
    return new Array(6).fill(null).map((_, i) => i * 10);
  }
}
</script>

<style lang="scss" scoped>
.action-panel {
  padding: 5px;
  text-align: center;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
  background-color: #f2f2f2;
  border-radius: 5px;
}
</style>
