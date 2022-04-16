import { Layer } from "./types";
import { DEFAULT_LAYER_SIZE } from "./index";

interface DrawResizedImageParams {
  image: HTMLImageElement;
  imageSizeRatio: number;
  canvasCtx: CanvasRenderingContext2D;
  setLayerSize: React.Dispatch<React.SetStateAction<Layer>>;
}

export const drawResizedImageLayer = ({
  image,
  // imageSizeRatio,
  canvasCtx,
  setLayerSize,
}: DrawResizedImageParams): void => {
  if (
    image.width <= DEFAULT_LAYER_SIZE.WIDTH &&
    image.height <= DEFAULT_LAYER_SIZE.HEIGHT
  ) {
    setLayerSize({ width: image.width, height: image.height });
    canvasCtx.drawImage(image, 0, 0, image.width, image.height);
    return;
  }

  const ratio = image.height / image.width;

  if (image.width > image.height) {
    setLayerSize({
      width: DEFAULT_LAYER_SIZE.WIDTH,
      height: DEFAULT_LAYER_SIZE.HEIGHT * ratio,
    });
    canvasCtx.drawImage(
      image,
      0,
      0,
      DEFAULT_LAYER_SIZE.WIDTH,
      DEFAULT_LAYER_SIZE.HEIGHT * ratio
    );
    return;
  }

  if (image.width <= image.height) {
    setLayerSize({
      width: DEFAULT_LAYER_SIZE.WIDTH / ratio,
      height: DEFAULT_LAYER_SIZE.HEIGHT,
    });
    canvasCtx.drawImage(
      image,
      0,
      0,
      DEFAULT_LAYER_SIZE.WIDTH / ratio,
      DEFAULT_LAYER_SIZE.HEIGHT
    );
    return;
  }

  canvasCtx.drawImage(
    image,
    0,
    0,
    DEFAULT_LAYER_SIZE.WIDTH,
    DEFAULT_LAYER_SIZE.HEIGHT
  );
};
