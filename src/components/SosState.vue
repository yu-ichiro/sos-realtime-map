<template>
  <div>
    <span>{{ sosDate.year }}年目</span>
    <span>{{ sosDate.season }}</span>
    <span>{{ sosDate.day }}日 ({{ sosDate.weekday }})</span>
    <span>{{ zeroPad(sosDate.hour) }}:{{ zeroPad(sosDate.minute) }}</span>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import { sosDateModule, SosDateReadableValue } from "@/store/sos_date";

export default class SosState extends Vue {
  zeroPad(num: number): string {
    return ("00" + String(num)).slice(-2);
  }

  get sosDate(): SosDateReadableValue {
    return sosDateModule.date.readableValue;
  }
}
</script>

<style scoped></style>
