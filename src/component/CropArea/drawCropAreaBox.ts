import { CropAreaParams } from "./types";

const CROP_HANDLER_BOX_SIZE = 10;

export const drawCropAreaBox = (
  ctx: CanvasRenderingContext2D,
  cropArea: CropAreaParams
): void => {
  console.log("크롭부분 랜더", cropArea);

  //태두리선
  ctx.setLineDash([4, 2]);
  ctx.strokeRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);
  ctx.clearRect(cropArea.x, cropArea.y, cropArea.width, cropArea.height);

  //(임시)INNER AREA 구간 표기
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgb(255, 0, 0)";
  ctx.strokeRect(
    cropArea.x + 20,
    cropArea.y + 20,
    cropArea.width - 40,
    cropArea.height - 40
  );

  //구석부분 핸들링 박스
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.fillStyle = "rgb(255, 255, 255)";
  //좌상
  ctx.strokeRect(
    cropArea.x - CROP_HANDLER_BOX_SIZE / 2,
    cropArea.y - CROP_HANDLER_BOX_SIZE / 2,
    CROP_HANDLER_BOX_SIZE,
    CROP_HANDLER_BOX_SIZE
  );
  ctx.fillRect(
    cropArea.x - CROP_HANDLER_BOX_SIZE / 2,
    cropArea.y - CROP_HANDLER_BOX_SIZE / 2,
    CROP_HANDLER_BOX_SIZE,
    CROP_HANDLER_BOX_SIZE
  );
  //우상
  ctx.strokeRect(
    cropArea.x + cropArea.width - CROP_HANDLER_BOX_SIZE / 2,
    cropArea.y - CROP_HANDLER_BOX_SIZE / 2,
    CROP_HANDLER_BOX_SIZE,
    CROP_HANDLER_BOX_SIZE
  );
  ctx.fillRect(
    cropArea.x + cropArea.width - CROP_HANDLER_BOX_SIZE / 2,
    cropArea.y - CROP_HANDLER_BOX_SIZE / 2,
    CROP_HANDLER_BOX_SIZE,
    CROP_HANDLER_BOX_SIZE
  );
  //좌하
  ctx.strokeRect(
    cropArea.x - CROP_HANDLER_BOX_SIZE / 2,
    cropArea.y + cropArea.height - CROP_HANDLER_BOX_SIZE / 2,
    CROP_HANDLER_BOX_SIZE,
    CROP_HANDLER_BOX_SIZE
  );
  ctx.fillRect(
    cropArea.x - CROP_HANDLER_BOX_SIZE / 2,
    cropArea.y + cropArea.height - CROP_HANDLER_BOX_SIZE / 2,
    CROP_HANDLER_BOX_SIZE,
    CROP_HANDLER_BOX_SIZE
  );
  //우하
  ctx.strokeRect(
    cropArea.x + cropArea.width - CROP_HANDLER_BOX_SIZE / 2,
    cropArea.y + cropArea.height - CROP_HANDLER_BOX_SIZE / 2,
    CROP_HANDLER_BOX_SIZE,
    CROP_HANDLER_BOX_SIZE
  );
  ctx.fillRect(
    cropArea.x + cropArea.width - CROP_HANDLER_BOX_SIZE / 2,
    cropArea.y + cropArea.height - CROP_HANDLER_BOX_SIZE / 2,
    CROP_HANDLER_BOX_SIZE,
    CROP_HANDLER_BOX_SIZE
  );
};
