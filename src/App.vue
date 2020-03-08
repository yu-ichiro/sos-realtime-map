<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      牧場物語リアルタイムマップ
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <sos-map></sos-map>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { LMap, LImageOverlay, LMarker } from "vue2-leaflet";
import SosMap from "@/components/SosMap.vue";

@Component({
  components: { LMap, LImageOverlay, LMarker, SosMap }
})
export default class App extends Vue {}
</script>
