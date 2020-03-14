// TODO: イベント、その管理機能の実装を考える

import { stateDependent } from "@/store/sos_state";

export interface SosEvent {
  name: string;
  ready: stateDependent<boolean>;
}

export const eventDone: (
  event: SosEvent
) => stateDependent<boolean> = event => state => state.events.get(event.name) ?? false;
