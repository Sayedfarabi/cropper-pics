import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from "../../cropImage";

const aspectRatios = [
  { value: 4 / 3, text: "4/3" },
  { value: 16 / 9, text: "16/9" },
  { value: 1 / 2, text: "1/2" },
];

const ImageCropDialog = ({ imageURL, onCancel, setCroppedImageFor, resetImage }) => {



  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [aspect, setAspect] = useState(aspectRatios[0]);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onAspectChange = (e) => {
    const value = e.target.value;
    // console.log(value);
    const ratio = aspectRatios.find((ratio) => ratio?.value == value);
    // console.log(ratio);
    setAspect(ratio);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageURL, croppedAreaPixels);
    setCroppedImageFor(imageURL, crop, zoom, aspect, croppedImageUrl);
  };

  const onResetImage = () => {
    resetImage(imageURL);
  };

  return (
    <div className='mx-auto'>

      <div className='p-4 bg-gray-600'>
        <Cropper
          image={imageURL}
          zoom={zoom}
          crop={crop}
          aspect={aspect?.value}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}

        >
        </Cropper>
      </div>

      <div className="fixed bottom-0 h-20 w-full md:w-1/2 mx-4 md:mx-auto">
        <div className="text-center">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(e) => {
              onZoomChange(e?.target?.value);
            }}
            className="w-1/2"
          ></input>
          <select onChange={onAspectChange} className='px-4 mx-4 rounded-sm'>
            {aspectRatios.map((ratio) => (
              <option
                key={ratio?.text}
                value={ratio?.value}
                selected={ratio?.value === aspect?.value}
                className='text-blue-500'
              >
                {ratio?.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5 text-center">
          <button className=' mx-2 px-2 border bg-black text-white rounded-sm capitalize' onClick={onCancel}>Cancel</button>
          <button className=' mx-2 px-2 border bg-black text-white rounded-sm capitalize' onClick={onResetImage}>Reset</button>
          <button className=' mx-2 px-2 border bg-black text-white rounded-sm capitalize' onClick={onCrop}>Crop</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropDialog;