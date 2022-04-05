import { useEffect, useRef, useState } from "react";
import { ImageType } from "../../App";
import "./style.css";

interface CropAreaProps {
  image?: ImageType;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
  innerClickX: number;
  innerClickY: number;
}

type Layer = {
  width: number;
  height: number;
};

type Mode = "NONE" | "CROP";

enum DEFAULT_LAYER_SIZE {
  WIDTH = 500,
  HEIGHT = 500,
}

const DISABLED_CROP_AREA: CropArea = {
  x: -100,
  y: -100,
  width: 0,
  height: 0,
  innerClickX: 0,
  innerClickY: 0,
};

const INITIAL_CROP_AREA: CropArea = {
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  innerClickX: 0,
  innerClickY: 0,
};

export default function CropArea({ image }: CropAreaProps) {
  const [layerSize, setLayerSize] = useState<Layer>({
    width: DEFAULT_LAYER_SIZE.WIDTH,
    height: DEFAULT_LAYER_SIZE.HEIGHT,
  });
  const [cropArea, setCropArea] = useState<CropArea>(DISABLED_CROP_AREA);
  const [mode, setMode] = useState<Mode>("NONE");

  const rawImageLayer = useRef<HTMLCanvasElement>(null);
  const cropAreaLayer = useRef<HTMLCanvasElement>(null);

  const drawRawImageLayer = () => {
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

    setMode("CROP");
    console.log("이미지그리기끝");
  };

  const drawCropAreaLayer = () => {
    if (mode === "CROP") {
      if (cropArea === DISABLED_CROP_AREA) {
        setCropArea(INITIAL_CROP_AREA);
      }

      const canvas = cropAreaLayer.current;
      const canvasCtx = canvas?.getContext("2d");
      if (canvas) {
        console.log(canvas.width);
        canvasCtx?.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (canvasCtx && canvas) {
        canvasCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        drawCropAreaBox(canvasCtx, cropArea);
      }
    }
    if (mode === "NONE") {
      const canvas = cropAreaLayer.current;
      const context = canvas?.getContext("2d");
      if (canvas) context?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(drawRawImageLayer, [image]);
  useEffect(drawCropAreaLayer, [layerSize, cropArea, mode]);

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

const drawCropAreaBox = (
  ctx: CanvasRenderingContext2D,
  cropArea: CropArea
): void => {
  console.log(cropArea);
  const cropHandlerBoxWidth = 10;

  ctx.setLineDash([4, 2]);
  ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
  ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

  ctx.setLineDash([]);
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.strokeRect(
    cropArea.x - cropHandlerBoxWidth / 2,
    cropArea.y - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
  ctx.fillRect(
    cropArea.x - cropHandlerBoxWidth / 2,
    cropArea.y - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );

  ctx.strokeRect(
    cropArea.x + cropArea.width - cropHandlerBoxWidth / 2,
    cropArea.y - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
  ctx.fillRect(
    cropArea.x + cropArea.width - cropHandlerBoxWidth / 2,
    cropArea.y - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );

  ctx.strokeRect(
    cropArea.x - cropHandlerBoxWidth / 2,
    cropArea.y + cropArea.height - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
  ctx.fillRect(
    cropArea.x - cropHandlerBoxWidth / 2,
    cropArea.y + cropArea.height - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );

  ctx.strokeRect(
    cropArea.x + cropArea.width - cropHandlerBoxWidth / 2,
    cropArea.y + cropArea.height - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
  ctx.fillRect(
    cropArea.x + cropArea.width - cropHandlerBoxWidth / 2,
    cropArea.y + cropArea.height - cropHandlerBoxWidth / 2,
    cropHandlerBoxWidth,
    cropHandlerBoxWidth
  );
};
