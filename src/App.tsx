import { useState } from "react";
import "./App.css";

import CropArea from "./component/CropArea";
import ExportImage from "./component/ExportImage";
import Options from "./component/Options";

import { CropAreaParams } from "./component/CropArea/types";

export type ImageType = {
  file: File;
  url: string;
};

export const DISABLED_CROP_AREA: CropAreaParams = {
  x: -100,
  y: -100,
  width: 0,
  height: 0,
  innerClickX: 0,
  innerClickY: 0,
};

export const INITIAL_CROP_AREA: CropAreaParams = {
  x: 50,
  y: 50,
  width: 100,
  height: 100,
  innerClickX: 0,
  innerClickY: 0,
};

export default function App() {
  const [image, setImage] = useState<ImageType | undefined>();
  const [imageSizeRatio, setImageSizeRatio] = useState<number>(1);
  const [cropArea, setCropArea] = useState<CropAreaParams>(DISABLED_CROP_AREA);
  const [maginificationRate, setMaginificationRate] =
    useState<number | undefined>();

  return (
    <div className="app">
      <div className="app__topManu">Simple Cropper</div>
      <div className="app__cropArea">
        <CropArea
          image={image}
          cropArea={cropArea}
          imageSizeRatio={imageSizeRatio}
          setCropArea={setCropArea}
          setMaginificationRate={setMaginificationRate}
        />
      </div>
      <div className="app__options">
        <Options
          cropArea={cropArea}
          setCropArea={setCropArea}
          imageSizeRatio={imageSizeRatio}
          setImageSizeRatio={setImageSizeRatio}
          setImage={setImage}
        />
      </div>
      <div className="app__export">
        <ExportImage
          image={image}
          cropArea={cropArea}
          maginificationRate={maginificationRate}
        />
      </div>
    </div>
  );
}
