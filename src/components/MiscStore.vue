<template>
  <sos-store :x="place.x" :y="place.y" :lock-condition="place.lockCondition">{{
    place.name
  }}</sos-store>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SosStore from "@/components/SosStore.vue";
import { MiscStore as place, Place } from "@/assets/places";

@Component({
  components: { SosStore }
})
export default class MiscStore extends Vue {
  get place(): Place {
    return place;
  }
}
</script>

<style scoped></style>
