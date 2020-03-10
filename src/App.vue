<template>
  <v-app>
    <v-app-bar app color="green" dark>
      牧場物語リアルタイムマップ
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content :style="{ height: `${height}px` }">
      <sos-state></sos-state>
      <sos-map></sos-map>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { LMap, LImageOverlay, LMarker } from "vue2-leaflet";
import SosMap from "@/components/SosMap.vue";
import SosState from "@/components/SosState.vue";

@Component({
  components: { LMap, LImageOverlay, LMarker, SosMap, SosState }
})
export default class App extends Vue {
  _height = window.innerHeight;
  _previousHeight = window.innerHeight;

  adjustHeight(): void {
    if (
      (this.$data as App)._previousHeight !== (this.$data as App)._height ||
      (this.$data as App)._height !== window.innerHeight
    )
      setTimeout(this.adjustHeight, 10);
    (this.$data as App)._previousHeight = (this.$data as App)._height;
    (this.$data as App)._height = window.innerHeight;
  }

  get height(): number {
    return (this.$data as App)._height;
  }

  created() {
    window.addEventListener("resize", this.adjustHeight.bind(this));
  }

  destroyed() {
    window.removeEventListener("resize", this.adjustHeight.bind(this));
  }
}
</script>

<style>
/*
  Vuetifyのバグっぽいやつ。v-appに100vhがmin-heightに設定されているせいでiosのレイアウトが崩れる.
*/
/*noinspection CssUnusedSymbol*/
.v-application--wrap {
  min-height: 100% !important;
}
</style>
