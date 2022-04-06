export interface CropAreaParams {
  x: number;
  y: number;
  width: number;
  height: number;
  innerClickX: number;
  innerClickY: number;
}

export interface MouseCoordinate {
  x: number;
  y: number;
}

export type Layer = {
  width: number;
  height: number;
};

export type Mode = "NONE" | "CROP";
export type MouseHold = "INNER_HOLD" | "OUTER_HOLD" | false;
export type MousePosition =
  | "INNER"
  | "E_OUTER"
  | "W_OUTER"
  | "S_OUTER"
  | "N_OUTER"
  | "NE_OUTER"
  | "NW_OUTER"
  | "SE_OUTER"
  | "SW_OUTER"
  | false;
