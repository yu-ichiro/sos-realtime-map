<template>
  <l-marker :lat-lng="position">
    <l-icon :icon-anchor="[20, 50]">
      <crop-image-pin :src="character.url" :alt="character.name" />
    </l-icon>
  </l-marker>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Character } from "@/assets/characters";
import { LatLng } from "leaflet";
import { sosStateModule } from "@/store/sos_state";
import { point2LatLng } from "@/map";
import { LIcon, LMarker } from "vue2-leaflet";
import CropImagePin from "@/components/CropImagePin.vue";

@Component({
  components: {
    CropImagePin,
    LMarker,
    LIcon
  }
})
export default class CharacterMarker extends Vue {
  @Prop({ required: true })
  character!: Character;

  get position(): LatLng {
    const { x, y } = this.character.place(sosStateModule);
    return point2LatLng(x, y);
  }
}
</script>
