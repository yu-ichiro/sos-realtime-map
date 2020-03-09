<template>
  <v-app>
    <v-app-bar app color="green" dark>
      牧場物語リアルタイムマップ
      <v-spacer></v-spacer>
      <sos-state></sos-state>
    </v-app-bar>

    <v-content>
      <sos-map></sos-map>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import SosMap from "@/components/SosMap.vue";
import SosState from "@/components/SosState.vue";

@Component({
  components: { SosMap, SosState }
})
export default class App extends Vue {}
</script>
