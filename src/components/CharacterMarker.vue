<template>
  <l-marker :lat-lng="position">
    <l-popup :options="{ offset: [0, -50] }">
      <h4>{{ character.name }}</h4>
      <span>{{ place.memo }}</span>
    </l-popup>
    <l-icon :icon-anchor="[20, 50]">
      <crop-pointer-pin
        :src="character.url"
        :alt="character.name"
        :disabled="!accessible"
      />
    </l-icon>
  </l-marker>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Character } from "@/assets/characters";
import { LatLng } from "leaflet";
import { sosStateModule } from "@/store/sos_state";
import { point2LatLng } from "@/map";
import { LIcon, LMarker, LPopup } from "vue2-leaflet";
import CropPointerPin from "@/components/CropPointerPin.vue";
import { Place } from "@/assets/places";

@Component({
  components: {
    CropPointerPin,
    LMarker,
    LIcon,
    LPopup
  }
})
export default class CharacterMarker extends Vue {
  @Prop({ required: true })
  character!: Character;

  get place(): Place {
    return this.character.place(sosStateModule.getState);
  }

  get accessible(): boolean {
    return this.place.accessible(sosStateModule.getState);
  }

  get position(): LatLng {
    const { x, y } = this.place;
    return point2LatLng(x, y);
  }
}
</script>
