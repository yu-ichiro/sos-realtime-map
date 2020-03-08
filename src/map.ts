import { LatLng } from "leaflet";

export const mapImage = {
  url: require("./assets/img/map.jpg"),
  width: 960,
  height: 540
};

export function point2LatLng(x: number, y: number): LatLng {
  return new LatLng(mapImage.height - y, x);
}
