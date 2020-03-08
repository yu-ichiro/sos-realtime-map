import Vue from "vue";
import Vuex from "vuex";
import { SosStateInterface } from "@/store/sos_state";

Vue.use(Vuex);

export interface RootState {
  sosState: SosStateInterface;
}

export default new Vuex.Store<RootState>({});
