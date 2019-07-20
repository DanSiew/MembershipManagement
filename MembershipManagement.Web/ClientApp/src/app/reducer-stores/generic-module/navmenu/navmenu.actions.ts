import { Action } from "@ngrx/store";

export enum NavMenuTypes {
  NavMenuShow = "[NavMenu] NavMenu Show",
  NavMenuHide = "[NavMenu] NavMenu Hide"
}

export class NavMenuShow implements Action {
  readonly type = NavMenuTypes.NavMenuShow;
  constructor(public payload: { isNavMenuOverlay: boolean }) { }

}

export class NavMenuHide implements Action {
  readonly type = NavMenuTypes.NavMenuHide;
}

export type NavMenuActions =
  NavMenuShow |
  NavMenuHide;
