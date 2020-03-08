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
    <l-image-overlay :url="mapImage.url" :bounds="bounds"></l-image-overlay>
    <l-marker
      v-for="place in places"
      :key="place.name"
      :name="place.name"
      :lat-lng="place.latlng"
    ></l-marker>
  </l-map>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CRS, LatLng, LatLngBounds } from "leaflet";
import { Place, all } from "@/assets/places";
import { LMap, LImageOverlay, LMarker } from "vue2-leaflet";

@Component({
  components: { LMap, LImageOverlay, LMarker }
})
export default class SosMap extends Vue {
  crs: CRS = CRS.Simple;
  bounds: LatLngBounds = new LatLngBounds(
    [this.mapImage.height, 0],
    [0, this.mapImage.width]
  );

  point2LatLng(x: number, y: number): LatLng {
    return new LatLng(this.mapImage.height - y, x);
  }

  get places(): { name: string; latlng: LatLng }[] {
    return all.map((place: Place) => ({
      name: place.name,
      latlng: this.point2LatLng(place.x, place.y)
    }));
  }

  get mapImage() {
    return {
      url: "/img/map.jpg",
      width: 960,
      height: 540
    };
  }
}
</script>
