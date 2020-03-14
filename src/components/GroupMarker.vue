<template>
  <l-marker :lat-lng="position">
    <l-popup :options="{ offset: [0, -50] }">
      <h4 class="place name">{{ place.name }}</h4>
      ここにいるキャラクター:<br />
      <div
        class="character"
        v-for="character in characters"
        :key="character.name"
      >
        {{ character.name }}<br />
        <img :src="character.url" :alt="character.name" />
      </div>
    </l-popup>
    <l-icon :icon-anchor="[20, 50]">
      <crop-pointer-pin :alt="place.name" text :disabled="!accessible">
        {{ characters.length }}
      </crop-pointer-pin>
    </l-icon>
  </l-marker>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Character } from "@/assets/characters";
import { LatLng } from "leaflet";
import { point2LatLng } from "@/map";
import { LIcon, LMarker, LPopup } from "vue2-leaflet";
import CropPointerPin from "@/components/CropPointerPin.vue";
import { Place } from "@/assets/places";
import { sosStateModule } from "@/store/sos_state";

@Component({
  components: {
    CropPointerPin,
    LMarker,
    LIcon,
    LPopup
  }
})
export default class GroupMarker extends Vue {
  @Prop({ required: true })
  place!: Place;

  @Prop({ required: true })
  characters!: Character[];

  get position(): LatLng {
    const { x, y } = this.place;
    return point2LatLng(x, y);
  }

  get accessible(): boolean {
    const { accessible } = this.place;
    return accessible(sosStateModule.getState);
  }
}
</script>

<style lang="scss" scoped>
.character {
  text-align: center;
  display: inline-block;
  margin: 5px 10px;
  font-size: 0.9em;
  font-weight: bold;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
}
</style>
