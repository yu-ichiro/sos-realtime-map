import Vue from "vue";
import Vuex from "vuex";
import { SosDateInterface } from "@/store/sos_date";

Vue.use(Vuex);

export interface RootState {
  sosDate: SosDateInterface;
}

export default new Vuex.Store<RootState>({});
