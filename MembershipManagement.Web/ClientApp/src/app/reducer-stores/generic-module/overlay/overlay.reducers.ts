import { OverlayActions, OverlayTypes } from "app/reducer-stores/generic-module/overlay/overlay.actions";

export interface OverlayState {
  showed: boolean
}

export const initialOverlayState: OverlayState = { showed: false };

export function overlayReducer(state = initialOverlayState, action: OverlayActions): OverlayState {

  switch (action.type) {
    case OverlayTypes.OverlayHide: {
      return { ...state, showed: false  };
    }
    case OverlayTypes.OverlayShow: {
      return { ...state, showed: true };
    }
    default: {
      return state;
    }
  }
}
