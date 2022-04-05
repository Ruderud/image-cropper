import { useEffect, useRef } from "react";
import { ImageType } from "../../App";
import "./style.css";

interface CropAreaProps {
  image: ImageType | undefined;
}

enum IMAGE_LAYER_SIZE {
  WIDTH = 500,
  HEIGHT = 500,
}

export default function CropArea({ image }: CropAreaProps) {
  const rawImageLayer = useRef<HTMLCanvasElement>(null);
  const cropAreaLayer = useRef<HTMLCanvasElement>(null);

  const drawRawImageLayer = () => {
    // setMode("NONE");
    if (image === undefined) return;

    const canvas = rawImageLayer.current;
    const canvasCtx = canvas?.getContext("2d");
    canvasCtx?.clearRect(0, 0, IMAGE_LAYER_SIZE.WIDTH, IMAGE_LAYER_SIZE.HEIGHT);
    const img = new Image();
    img.src = image?.url;
    img.onload = () => {
      canvasCtx?.drawImage(
        img,
        0,
        0,
        IMAGE_LAYER_SIZE.WIDTH,
        IMAGE_LAYER_SIZE.HEIGHT
      );
    };
  };

  useEffect(drawRawImageLayer, [image]);

  return (
    <div className="cropArea__container">
      <canvas
        ref={rawImageLayer}
        className="cropArea__rawImageLayer"
        width={IMAGE_LAYER_SIZE.WIDTH}
        height={IMAGE_LAYER_SIZE.HEIGHT}
      />
      <canvas
        ref={cropAreaLayer}
        className="cropArea__cropAreaLayer"
        width={IMAGE_LAYER_SIZE.WIDTH}
        height={IMAGE_LAYER_SIZE.HEIGHT}
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
