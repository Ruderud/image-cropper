import { ImageType } from "../../App";
import "./style.css";

interface OptionsProps {
  setImage: React.Dispatch<React.SetStateAction<ImageType | undefined>>;
}

export default function Options({ setImage }: OptionsProps) {
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

  return (
    <div className="options__container">
      <label htmlFor="cropAreaHandler__width">CropArea Width</label>
      <input className="cropAreaHandler__width" type="number" />
      <label htmlFor="cropAreaHandler__height">CropArea Height</label>
      <input className="cropAreaHandler__height" type="number" />
      <input
        className="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
}
