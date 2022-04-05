import { useEffect, useRef, useState } from "react";
import { ImageType } from "../../App";
import "./style.css";

interface CropAreaProps {
  image?: ImageType;
}

type Layer = {
  width: number;
  height: number;
};

enum DEFAULT_LAYER_SIZE {
  WIDTH = 500,
  HEIGHT = 500,
}

export default function CropArea({ image }: CropAreaProps) {
  const [layerSize, setLayerSize] = useState<Layer>({
    width: DEFAULT_LAYER_SIZE.WIDTH,
    height: DEFAULT_LAYER_SIZE.HEIGHT,
  });

  const rawImageLayer = useRef<HTMLCanvasElement>(null);
  const cropAreaLayer = useRef<HTMLCanvasElement>(null);

  const drawRawImageLayer = () => {
    // setMode("NONE");
    if (image === undefined) return;

    const canvas = rawImageLayer.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    canvasCtx.clearRect(
      0,
      0,
      DEFAULT_LAYER_SIZE.WIDTH,
      DEFAULT_LAYER_SIZE.HEIGHT
    );

    const img = new Image();
    img.src = image?.url;
    img.onload = () => {
      drawResizedImage({
        image: img,
        canvasCtx,
        setLayerSize,
      });
    };
    console.log(layerSize);
  };

  useEffect(drawRawImageLayer, [image]);

  return (
    <div className="cropArea__container">
      <canvas
        ref={rawImageLayer}
        className="cropArea__rawImageLayer"
        width={layerSize.width}
        height={layerSize.height}
      />
      <canvas
        ref={cropAreaLayer}
        className="cropArea__cropAreaLayer"
        width={layerSize.width}
        height={layerSize.height}
        // onMouseDown={handleCropAreaLayerMouseDown}
        onMouseMove={(evt) => {
          // debounceOnMouseHandler(evt);
          // handleCropAreaLayerMouseMove(evt);
        }}
        // onMouseOut={handleCropAreaLayerMouseOut}
        // onMouseUp={handleCropAreaLayerMouseUp}
      />
    </div>
  );
}

interface DrawResizedImageParams {
  image: HTMLImageElement;
  canvasCtx: CanvasRenderingContext2D;
  setLayerSize: React.Dispatch<React.SetStateAction<Layer>>;
}

const drawResizedImage = ({
  image,
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

  const ratio = Math.floor(image.height / image.width);

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

  console.log("default");
  canvasCtx.drawImage(
    image,
    0,
    0,
    DEFAULT_LAYER_SIZE.WIDTH,
    DEFAULT_LAYER_SIZE.HEIGHT
  );
};
