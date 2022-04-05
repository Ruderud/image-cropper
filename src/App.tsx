import { useState } from "react";
import "./App.css";
import CropArea from "./component/CropArea";
import Options from "./component/Options";

export type ImageType = {
  file: File;
  url: string;
};

export default function App() {
  const [image, setImage] = useState<ImageType | undefined>();

  return (
    <div className="app">
      <div className="app__topManu">Simple Cropper</div>
      <div className="app__cropArea">
        <CropArea image={image} />
      </div>
      <div className="app__options">
        <Options setImage={setImage} />
      </div>
      <div className="app__export">export CroppedImage</div>
    </div>
  );
}
