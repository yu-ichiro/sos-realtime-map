<template>
  <l-map
    ref="map"
    id="map"
    style="height: 100%"
    :crs="crs"
    :min-zoom="-1"
    :max-zoom="6"
    :bounds="bounds"
  >
    <l-image-overlay :url="url" :bounds="bounds"></l-image-overlay>
    <misc-store />
  </l-map>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CRS, LatLng, LatLngBounds } from "leaflet";
import { Place, all } from "@/assets/places";
import { LMap, LImageOverlay, LMarker } from "vue2-leaflet";
import { mapImage, point2LatLng } from "@/map";
import MiscStore from "@/components/MiscStore.vue";

@Component({
  components: { MiscStore, LMap, LImageOverlay, LMarker }
})
export default class SosMap extends Vue {
  crs: CRS = CRS.Simple;
  bounds: LatLngBounds = new LatLngBounds(
    [mapImage.height, 0],
    [0, mapImage.width]
  );

  get places(): { name: string; latlng: LatLng }[] {
    return all.map((place: Place) => ({
      name: place.name,
      latlng: point2LatLng(place.x, place.y)
    }));
  }

  get url(): string {
    return mapImage.url;
  }
}
</script>
