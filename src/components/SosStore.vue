<template>
  <l-marker :lat-lng="latLng" v-if="!lockCondition(sosDateReadableValue)">
    <slot></slot>
  </l-marker>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { LMarker } from "vue2-leaflet";
import { LatLng } from "leaflet";
import { sosDateModule, SosDateReadableValue } from "@/store/sos_date";
import { point2LatLng } from "@/map";

@Component({ components: { LMarker } })
export default class SosStore extends Vue {
  @Prop({ required: true, type: Number })
  x!: number;

  @Prop({ required: true, type: Number })
  y!: number;

  @Prop({ required: true, type: Function })
  lockCondition!: (val: SosDateReadableValue) => boolean;

  get latLng(): LatLng {
    return point2LatLng(this.x, this.y);
  }

  get sosDateReadableValue(): SosDateReadableValue {
    return sosDateModule.date.readableValue;
  }
}
</script>

<style scoped></style>
