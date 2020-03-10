<template>
  <l-map
    ref="map"
    id="map"
    style="z-index: 0;"
    :crs="crs"
    :min-zoom="-1"
    :max-zoom="6"
    :bounds="bounds"
  >
    <l-image-overlay :url="url" :bounds="bounds"></l-image-overlay>
    <character-marker
      :character="character"
      v-for="character in characters"
      :key="character.name"
    ></character-marker>
  </l-map>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CRS, LatLngBounds } from "leaflet";
import { LMap, LImageOverlay, LMarker } from "vue2-leaflet";
import { mapImage } from "@/map";
import MiscStore from "@/components/MiscStore.vue";
import SosStore from "@/components/SosStore.vue";
import CharacterMarker from "@/components/CharacterMarker.vue";
import { Characters } from "@/assets/characters";

@Component({
  components: {
    CharacterMarker,
    SosStore,
    MiscStore,
    LMap,
    LImageOverlay,
    LMarker
  }
})
export default class SosMap extends Vue {
  crs: CRS = CRS.Simple;
  bounds: LatLngBounds = new LatLngBounds(
    [mapImage.height, 0],
    [0, mapImage.width]
  );

  get characters() {
    return Object.values(Characters);
  }

  get url(): string {
    return mapImage.url;
  }
}
</script>
