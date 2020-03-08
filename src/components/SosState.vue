<template>
  <v-dialog v-model="edit">
    <template #activator="{ on }">
      <div v-on="on">
        <span>{{ sosDate.year }}年目</span>
        <span>{{ seasonName(sosDate.season) }}</span>
        <span>{{ sosDate.day }}日 ({{ weekdayName(sosDate.weekday) }})</span>
        <span>{{ zeroPad(sosDate.hour) }}:{{ zeroPad(sosDate.minute) }}</span>
      </div>
    </template>
    <v-card>
      <v-card-title class="headline">
        時間の設定
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="localDateState.year" label="年" />
        <v-select
          :items="seasonTable"
          item-text="text"
          item-value="value"
          v-model="localDateState.season"
          label="季節"
        />
        <v-select :items="days" v-model="localDateState.day" label="日" />
        <v-select :items="hours" v-model="localDateState.hour" label="時" />
        <v-select :items="minutes" v-model="localDateState.minute" label="分" />
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
  SosDateReadableValue
} from "@/store/sos_state";

@Component
export default class SosState extends Vue {
  edit = false;

  localDateState: SosDateReadableValue = {
    year: 1,
    season: "Spring",
    day: 2,
    weekday: "Mon",
    hour: 6,
    minute: 0
  };

  @Watch("edit")
  onEditChange() {
    this.localDateState = Object.assign(Object.create(null), this.sosDate);
  }

  update() {
    sosStateModule.replaceDateState(this.localDateState);
    this.edit = false;
  }

  zeroPad(num: number): string {
    return ("00" + String(num)).slice(-2);
  }

  seasonName(season: keyof typeof Seasons) {
    if (season == "Spring") return "春";
    if (season == "Summer") return "夏";
    if (season == "Autumn") return "秋";
    if (season == "Winter") return "冬";
    throw new Error("Unreachable");
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

  get sosDate(): SosDateReadableValue {
    return sosStateModule.date.readableValue;
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

<style scoped></style>
