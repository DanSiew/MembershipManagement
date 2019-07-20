import { Action } from "@ngrx/store";

export enum OverlayTypes {
  OverlayShow = "[Overlay] Show Overlay",
  OverlayHide = "[Overlay] Hide Overlay"
}

export class OverlayShow implements Action {
  readonly type = OverlayTypes.OverlayShow;
}

export class OverlayHide implements Action {
  readonly type = OverlayTypes.OverlayHide;
}

export type OverlayActions =
  OverlayShow |
  OverlayHide;
