<template>
  <div
    :class="{ 'pointer-pin': true, disabled: disabled }"
    :style="{ width: style.width, height: style.height }"
  >
    <div class="pin-img-backblack" :style="style" />
    <span v-if="text" class="pin-text" :style="style"><slot></slot></span>
    <img v-else class="pin-img" :src="src" :alt="alt" :style="style" />
    <div class="pointer-pin-triangle"></div>
    <div class="pointer-pin-triangle backblack"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class CropPointerPin extends Vue {
  @Prop({ required: false, default: String })
  src!: string;

  @Prop({ required: false, default: false, type: Boolean })
  text!: boolean;

  @Prop({ required: false, default: false, type: Boolean })
  disabled!: boolean;

  @Prop({ required: true })
  alt!: string;

  get size(): number {
    return 40;
  }

  get style() {
    return {
      "border-radius": `${this.size / 2}px`,
      "line-height": `${this.size * 0.85}px`,
      "font-size": `${this.size * 0.7}px`,
      width: `${this.size}px`,
      height: `${this.size}px`
    };
  }
}
</script>
<style lang="scss" scoped>
.pointer-pin {
  position: absolute;
  z-index: 0;

  &.disabled {
    opacity: 0.6;
  }
}

.pointer-pin-triangle {
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
.pointer-pin-triangle.backblack {
  bottom: -60%;
  border-color: transparent transparent transparent black;
  z-index: 1;
}

.pin-img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  border: solid 2px white;
}

.pin-text {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  border: solid 2px white;
  background-color: white;
  font-weight: bold;
  text-align: center;
}

.pin-img-backblack {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  box-shadow: 0 0 0 2px black;
}
</style>
