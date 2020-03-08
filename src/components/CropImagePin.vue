<template>
  <div
    class="character-pin"
    :style="{ width: style.width, height: style.height }"
  >
    <div class="character-img-backblack" :style="style" />
    <img class="character-img" :src="src" :alt="alt" :style="style" />
    <div class="character-pin-triangle"></div>
    <div class="character-pin-triangle backblack"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class CropImagePin extends Vue {
  @Prop({ required: true })
  src!: string;

  @Prop({ required: true })
  alt!: string;

  get size(): number {
    return 40;
  }

  get style() {
    return {
      "border-radius": `${this.size / 2}px`,
      width: `${this.size}px`,
      height: `${this.size}px`
    };
  }
}
</script>
<style lang="scss" scoped>
.character-pin {
  position: absolute;
  z-index: 0;
}

.character-pin-triangle {
  position: absolute;
  width: 0;
  height: 0;
  left: 50%;
  bottom: -50%;
  border-style: solid;
  border-color: transparent transparent transparent white;
  border-width: 10px 0 10px 17.32px;
  transform: translate(-50%, -50%) rotate(90deg);
  z-index: 2;
}
.character-pin-triangle.backblack {
  bottom: -60%;
  border-color: transparent transparent transparent black;
  z-index: 1;
}
.character-img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  border: solid 2px white;
}

.character-img-backblack {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  box-shadow: 0 0 0 2px black;
}
</style>
