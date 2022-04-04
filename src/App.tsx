import "./App.css";
import CropArea from "./component/CropArea";

export default function App() {
  return (
    <div className="app">
      <div className="app__topManu">Simple Cropper</div>
      <div className="app__cropArea">
        <CropArea />
      </div>
      <div className="app__option">crop option</div>
      <div className="app__export">export CroppedImage</div>
    </div>
  );
}
