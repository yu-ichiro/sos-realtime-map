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
    <template v-for="[place, characters] in groupedCharacters">
      <character-marker
        v-if="characters.length === 1"
        :character="characters[0]"
        :key="characters[0].name"
      ></character-marker>
      <group-marker
        v-else
        :place="place"
        :characters="characters"
        :key="place.memo"
      ></group-marker>
    </template>
  </l-map>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CRS, LatLngBounds } from "leaflet";
import { LMap, LImageOverlay } from "vue2-leaflet";
import { mapImage } from "@/map";
import SosStore from "@/components/SosStore.vue";
import CharacterMarker from "@/components/CharacterMarker.vue";
import { Characters } from "@/assets/characters";
import { sosStateModule } from "@/store/sos_state";
import { groupBy } from "@/util";
import GroupMarker from "@/components/GroupMarker.vue";

@Component({
  components: {
    GroupMarker,
    CharacterMarker,
    SosStore,
    LMap,
    LImageOverlay
  }
})
export default class SosMap extends Vue {
  crs: CRS = CRS.Simple;
  bounds: LatLngBounds = new LatLngBounds(
    [mapImage.height, 0],
    [0, mapImage.width]
  );

  get groupedCharacters() {
    return groupBy(Object.values(Characters), char =>
      char.place(sosStateModule.getState)
    );
  }

  get characters() {
    return Object.values(Characters);
  }

  get url(): string {
    return mapImage.url;
  }
}
</script>
