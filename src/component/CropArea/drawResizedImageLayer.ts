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
  imageSizeRatio,
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

  // const ratio = image.height / image.width;

  if (image.width > image.height) {
    setLayerSize({
      width: DEFAULT_LAYER_SIZE.WIDTH,
      height: DEFAULT_LAYER_SIZE.HEIGHT * imageSizeRatio,
    });
    canvasCtx.drawImage(
      image,
      0,
      0,
      DEFAULT_LAYER_SIZE.WIDTH,
      DEFAULT_LAYER_SIZE.HEIGHT / imageSizeRatio
    );
    return;
  }

  if (image.width <= image.height) {
    setLayerSize({
      width: DEFAULT_LAYER_SIZE.WIDTH / imageSizeRatio,
      height: DEFAULT_LAYER_SIZE.HEIGHT,
    });
    canvasCtx.drawImage(
      image,
      0,
      0,
      DEFAULT_LAYER_SIZE.WIDTH / imageSizeRatio,
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
