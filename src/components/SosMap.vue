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
    <l-image-overlay
      :url="url"
      :bounds="bounds"
      :attribution="attribution"
    ></l-image-overlay>
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
        :key="characters.reduce((prev, character) => prev + character.name, '')"
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
    if (sosStateModule.date.readableValue.season === "Winter")
      return require("@/assets/img/map-winter.jpg");
    return mapImage.url;
  }

  anchorTag(url: string, innerText?: string): string {
    return `<a href="${url}" target="_blank">${innerText ?? url}</a>`;
  }

  get attribution(): string {
    const attrs: string[] = [
      this.anchorTag(
        "https://github.com/yu-ichiro/sos-realtime-map",
        "Yu-ichiro"
      ),
      "&copy;2017 Nintendo",
      "&copy;2019 Marvelous Inc."
    ];
    return attrs.join(" | ");
  }
}
</script>

<style>
/*noinspection CssUnusedSymbol*/
.leaflet-marker-icon {
  transition: transform 0.5s linear;
}
</style>
