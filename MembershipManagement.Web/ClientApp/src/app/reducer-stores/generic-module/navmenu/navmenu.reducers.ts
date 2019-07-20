import { NavMenuActions, NavMenuTypes } from "app/reducer-stores/generic-module/navmenu/navmenu.actions";

export interface NavMenuState {
  isNavMenuOpen: boolean,
  isNavMenuToggle: boolean,
  isNavMenuOverlay: boolean
}

export const initialNavMenuState: NavMenuState = { isNavMenuOpen: false, isNavMenuToggle: false, isNavMenuOverlay: false };

export function navmenuReducer(state = initialNavMenuState, action: NavMenuActions): NavMenuState {
  switch (action.type) {
    case NavMenuTypes.NavMenuHide: {
      return { ...state, isNavMenuOpen: false, isNavMenuToggle: true, isNavMenuOverlay : false };
    }
    case NavMenuTypes.NavMenuShow: {
      return { ...state, isNavMenuOpen: true, isNavMenuToggle: false, isNavMenuOverlay: action.payload.isNavMenuOverlay };
    }
    default: {
      return state;
    }
  }
}
