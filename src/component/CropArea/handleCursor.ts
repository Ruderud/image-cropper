import {
  CropAreaParams,
  MouseCoordinate,
  MouseHold,
  MousePosition,
} from "./types";

interface CropAreaCoordinates {
  X_OUTER_LEFT: number;
  X_INNER_LEFT: number;
  X_INNER_RIGHT: number;
  X_OUTER_RIGHT: number;
  Y_OUTER_TOP: number;
  Y_INNER_TOP: number;
  Y_INNER_BOTTOM: number;
  Y_OUTER_BOTTOM: number;
}

export const checkMouseCoordinate = (
  cropArea: CropAreaParams,
  mouseCoordinate: MouseCoordinate
): MouseHold => {
  if (
    mouseCoordinate.x > cropArea.x + 20 &&
    mouseCoordinate.x < cropArea.x + cropArea.width - 20 &&
    mouseCoordinate.y > cropArea.y + 20 &&
    mouseCoordinate.y < cropArea.y + cropArea.height - 20
  )
    return "INNER_HOLD";

  if (
    mouseCoordinate.x > cropArea.x &&
    mouseCoordinate.x < cropArea.x + cropArea.width &&
    mouseCoordinate.y > cropArea.y &&
    mouseCoordinate.y < cropArea.y + cropArea.height
  )
    return "OUTER_HOLD";

  return false;
};

export const mousePositionInCropArea = (
  cropArea: CropAreaParams,
  mouseCoordinate: MouseCoordinate
): MousePosition => {
  const OUTER_MARGIN = 30;

  const COORDINATES: CropAreaCoordinates = {
    X_OUTER_LEFT: cropArea.x - OUTER_MARGIN,
    X_INNER_LEFT:
      cropArea.x + (cropArea.width + OUTER_MARGIN * 2) * 0.2 - OUTER_MARGIN,
    X_INNER_RIGHT:
      cropArea.x + (cropArea.width + OUTER_MARGIN * 2) * 0.8 - OUTER_MARGIN,
    X_OUTER_RIGHT: cropArea.x + cropArea.width + OUTER_MARGIN,
    Y_OUTER_TOP: cropArea.y - OUTER_MARGIN,
    Y_INNER_TOP:
      cropArea.y + (cropArea.height + OUTER_MARGIN * 2) * 0.2 - OUTER_MARGIN,
    Y_INNER_BOTTOM:
      cropArea.y + (cropArea.height + OUTER_MARGIN * 2) * 0.8 - OUTER_MARGIN,
    Y_OUTER_BOTTOM: cropArea.y + cropArea.height + OUTER_MARGIN,
  };

  if (
    mouseCoordinate.x < COORDINATES.X_OUTER_LEFT ||
    mouseCoordinate.x >= COORDINATES.X_OUTER_RIGHT ||
    mouseCoordinate.y < COORDINATES.Y_OUTER_TOP ||
    mouseCoordinate.y >= COORDINATES.Y_OUTER_BOTTOM
  )
    return false;

  if (
    mouseCoordinate.x >= COORDINATES.X_OUTER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.y >= COORDINATES.Y_OUTER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_TOP
  )
    return "NW_OUTER";

  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_OUTER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_TOP
  )
    return "N_OUTER";

  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.x < COORDINATES.X_OUTER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_OUTER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_TOP
  )
    return "NE_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_OUTER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_BOTTOM
  )
    return "W_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_BOTTOM
  )
    return "INNER";
  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.x < COORDINATES.X_OUTER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_TOP &&
    mouseCoordinate.y < COORDINATES.Y_INNER_BOTTOM
  )
    return "E_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_OUTER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_BOTTOM &&
    mouseCoordinate.y < COORDINATES.Y_OUTER_BOTTOM
  )
    return "SW_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_LEFT &&
    mouseCoordinate.x < COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_BOTTOM &&
    mouseCoordinate.y < COORDINATES.Y_OUTER_BOTTOM
  )
    return "S_OUTER";
  if (
    mouseCoordinate.x >= COORDINATES.X_INNER_RIGHT &&
    mouseCoordinate.x < COORDINATES.X_OUTER_RIGHT &&
    mouseCoordinate.y >= COORDINATES.Y_INNER_BOTTOM &&
    mouseCoordinate.y < COORDINATES.Y_OUTER_BOTTOM
  )
    return "SE_OUTER";

  return false;
};
