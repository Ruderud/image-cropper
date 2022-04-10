import { useEffect, useRef, useState } from "react";
import { ImageType } from "../../App";
import { CropAreaParams } from "../CropArea/types";

interface ExportProps {
  image?: ImageType;
  cropArea: CropAreaParams;
  maginificationRate?: number;
}

export default function ExportImage({
  image,
  cropArea,
  maginificationRate,
}: ExportProps) {
  const croppedImageLayer = useRef<HTMLCanvasElement>(null);
  const imageDownloadLink = useRef<HTMLLinkElement>(null);

  const [layerSize, setLayerSize] = useState({
    width: 0,
    height: 0,
  });

  const handleSaveBtn = () => {
    if (!image) return console.log("저장할 이미지 원본없음");

    const cropCanvas = croppedImageLayer.current;

    // if (!saveImageURL) return;
    // imageDownload(saveImageURL)
  };

  useEffect(() => {
    if (!image || !maginificationRate)
      return console.log("크롭할이미지 원본없음");
    const cropCanvas = croppedImageLayer.current;
    const cropCanvasCtx = cropCanvas?.getContext("2d");

    if (cropCanvas) {
      cropCanvasCtx?.clearRect(0, 0, cropArea.width, cropArea.height);
    }

    const img = new Image();
    img.src = image.url;

    cropCanvasCtx?.rect(
      0,
      0,
      img.width * maginificationRate,
      img.height * maginificationRate
    );
    cropCanvasCtx?.clip();

    cropCanvasCtx?.drawImage(
      img,
      -cropArea.x,
      -cropArea.y,
      img.width * maginificationRate,
      img.height * maginificationRate
    );

    console.log(maginificationRate);

    setLayerSize({
      width: cropArea.width,
      height: cropArea.height,
    });
  }, [cropArea]);

  return (
    <>
      <canvas
        ref={croppedImageLayer}
        width={layerSize.width}
        height={layerSize.height}
      ></canvas>
      <button onClick={handleSaveBtn}>저장하기</button>
    </>
  );
}

const imageDownload = (imageURL: string): void => {
  const link = document.createElement("a");
  link.href = imageURL;
  link.setAttribute("download", "resizedImage.png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
