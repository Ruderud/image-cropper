import { useEffect, useRef, useState } from "react";
import "./style.css";
import { DISABLED_CROP_AREA, ImageType, INITIAL_CROP_AREA } from "../../App";
import { CropAreaParams, Layer, Mode, MouseHold, MousePosition } from "./types";
import { drawResizedImageLayer } from "./drawResizedImageLayer";
import { drawCropAreaBox } from "./drawCropAreaBox";
import { checkMouseCoordinate, mousePositionInCropArea } from "./handleCursor";

export enum DEFAULT_LAYER_SIZE {
  WIDTH = 500,
  HEIGHT = 500,
}

interface CropAreaProps {
  image?: ImageType;
  cropArea: CropAreaParams;
  imageSizeRatio: number;
  setCropArea: React.Dispatch<React.SetStateAction<CropAreaParams>>;
  setMaginificationRate: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

export default function CropArea({
  image,
  cropArea,
  imageSizeRatio,
  setCropArea,
  setMaginificationRate,
}: CropAreaProps) {
  const [layerSize, setLayerSize] = useState<Layer>({
    width: DEFAULT_LAYER_SIZE.WIDTH,
    height: DEFAULT_LAYER_SIZE.HEIGHT,
  });
  // const [cropArea, setCropArea] = useState<CropAreaParams>(DISABLED_CROP_AREA);
  const [mode, setMode] = useState<Mode>("NONE");
  const [isMouseHold, setIsMouseHold] = useState<MouseHold>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>(false);

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
      drawResizedImageLayer({
        image: img,
        imageSizeRatio,
        canvasCtx,
        setLayerSize,
      });
      // console.log(layerSize.width, img.width);
      setMaginificationRate(
        layerSize.width < layerSize.height
          ? layerSize.width / img.width
          : layerSize.height / img.height
      );
    };

    setMode("CROP");
  };

  const drawCropAreaLayer = () => {
    if (mode === "CROP") {
      if (cropArea === DISABLED_CROP_AREA) {
        console.log("그림");
        setCropArea(INITIAL_CROP_AREA);
      }

      const canvas = cropAreaLayer.current;
      const canvasCtx = canvas?.getContext("2d");
      if (canvas) {
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

  const handleCropAreaLayerMouseDown = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (mode === "NONE") return;

    const canvasPosition =
      cropAreaLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);

    const HOLD_POSITION = checkMouseCoordinate(cropArea, {
      x: evt.clientX - canvasPosition.x,
      y: evt.clientY - canvasPosition.y,
    });

    switch (HOLD_POSITION) {
      case "INNER_HOLD":
        console.log("이동");
        setIsMouseHold("INNER_HOLD");
        setCropArea({
          ...cropArea,
          innerClickX: evt.clientX - canvasPosition.x - cropArea.x,
          innerClickY: evt.clientY - canvasPosition.y - cropArea.y,
        });
        break;

      case "OUTER_HOLD":
        setIsMouseHold("OUTER_HOLD");
        break;

      default:
        break;
    }
  };

  const handleCropAreaLayerMouseMove = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvasPosition =
      cropAreaLayer.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
    const MOUSE_POSITION = mousePositionInCropArea(cropArea, {
      x: evt.clientX - canvasPosition.x,
      y: evt.clientY - canvasPosition.y,
    });

    setMousePosition(MOUSE_POSITION);

    if (mode === "NONE") return;
    if (!isMouseHold) return;

    if (isMouseHold === "INNER_HOLD" && mousePosition === "INNER") {
      setCropArea({
        ...cropArea,
        x: evt.clientX - canvasPosition.x - cropArea.innerClickX,
        y: evt.clientY - canvasPosition.y - cropArea.innerClickY,
      });
      return;
    }

    if (
      isMouseHold === "OUTER_HOLD" &&
      mousePosition &&
      mousePosition !== "INNER"
    ) {
      console.log("크기조절움직임");
      //현재 우하단 시작기준으로만 작성되어있음
      setCropArea({
        ...cropArea,
        width: evt.clientX - canvasPosition.x - cropArea.x,
        height: evt.clientY - canvasPosition.y - cropArea.y,
      });
    }
  };

  const handleCropAreaLayerMouseUp = (
    evt: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (mode === "NONE") return;
    if (!isMouseHold) return;

    setIsMouseHold(false);
  };

  const handleCursorStyle = () => {
    const cropAreaLayerEle = document.querySelector(".cropArea__cropAreaLayer");

    if (!cropAreaLayerEle) return;

    cropAreaLayerEle.setAttribute("style", "cursor:default");

    switch (mousePosition) {
      case !mousePosition:
        cropAreaLayerEle.setAttribute("style", "cursor:default");
        break;
      case "NW_OUTER":
        cropAreaLayerEle.setAttribute("style", "cursor:nwse-resize");
        break;
      case "N_OUTER":
        cropAreaLayerEle.setAttribute("style", "cursor:ns-resize");
        break;
      case "NE_OUTER":
        cropAreaLayerEle.setAttribute("style", "cursor:nesw-resize");
        break;
      case "W_OUTER":
        cropAreaLayerEle.setAttribute("style", "cursor:ew-resize");
        break;
      case "INNER":
        cropAreaLayerEle.setAttribute("style", "cursor:move");
        break;
      case "E_OUTER":
        cropAreaLayerEle.setAttribute("style", "cursor:ew-resize");
        break;
      case "SW_OUTER":
        cropAreaLayerEle.setAttribute("style", "cursor:nesw-resize");
        break;
      case "S_OUTER":
        cropAreaLayerEle.setAttribute("style", "cursor:ns-resize");
        break;
      case "SE_OUTER":
        cropAreaLayerEle.setAttribute("style", "cursor:nwse-resize");
        break;
      default:
        cropAreaLayerEle.setAttribute("style", "cursor:default");
        break;
    }
  };

  useEffect(drawRawImageLayer, [image]);
  //requestAnimationFrame 적용필요
  useEffect(drawCropAreaLayer, [layerSize, cropArea, mode]);
  // useEffect(RAF, [layerSize, cropArea, mode]);
  useEffect(handleCursorStyle, [mousePosition]);

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
        onMouseDown={handleCropAreaLayerMouseDown}
        onMouseMove={(evt) => {
          // debounceOnMouseHandler(evt);
          handleCropAreaLayerMouseMove(evt);
        }}
        // onMouseOut={handleCropAreaLayerMouseOut}
        onMouseUp={handleCropAreaLayerMouseUp}
      />
    </div>
  );
}
