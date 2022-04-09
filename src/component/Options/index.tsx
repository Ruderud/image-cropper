import { ImageType } from "../../App";
import { CropAreaParams } from "../CropArea/types";
import "./style.css";

interface OptionsProps {
  cropArea: CropAreaParams;
  setCropArea: React.Dispatch<React.SetStateAction<CropAreaParams>>;
  setImage: React.Dispatch<React.SetStateAction<ImageType | undefined>>;
}

export default function Options({
  cropArea,
  setCropArea,
  setImage,
}: OptionsProps) {
  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;

    const inputImageFile = evt.target.files[0];

    let fileReader = new FileReader();

    try {
      fileReader.readAsDataURL(inputImageFile);
      fileReader.onerror = () => {
        throw new Error("can't read file");
      };
      fileReader.onload = () => {
        if (fileReader.result === null || fileReader.result === undefined) {
          throw new Error("translate imageURL fail");
        }
        const imageURL = fileReader.result?.toString();
        setImage({
          file: inputImageFile,
          url: imageURL,
        });
      };
    } catch (err) {
      console.log(`Error message: ${err}`);
    }
  };

  const handleCropAreaSize = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setCropArea({
      ...cropArea,
      [name]: Number(value),
    });
  };

  return (
    <div className="options__container">
      <label htmlFor="cropAreaHandler__width">CropArea Width</label>
      <input
        className="cropAreaHandler__width"
        type="number"
        name="width"
        value={cropArea.width}
        onChange={handleCropAreaSize}
      />
      <label htmlFor="cropAreaHandler__height">CropArea Height</label>
      <input
        className="cropAreaHandler__height"
        type="number"
        name="height"
        value={cropArea.height}
        onChange={handleCropAreaSize}
      />
      <input
        className="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
}
