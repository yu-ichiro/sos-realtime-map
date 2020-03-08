import L from "leaflet";
import "leaflet/dist/leaflet.css";

type D = L.Icon.Default & {
  _getIconUrl: string;
};

delete (L.Icon.Default.prototype as D)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
