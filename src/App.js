import { useState } from "react";
import ImageCropDialog from "./components/imageCropDialog/ImageCropDialog";


function App() {

  const [images, setImages] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);


  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    const imagesObjectArray = imagesArray.map(imageURL => {
      return {
        imageURL
      }
    })
    setImages(imagesObjectArray);
    setSelectedImages((previousImages) => previousImages?.concat(imagesArray));
    event.target.value = "";
  };

  const onCancel = () => {
    setSelectedImages([]);
  };

  const setCroppedImageFor = (imageURL, crop, zoom, aspect, croppedImageUrl) => {
    const newImageList = [...images];
    const imageIndex = images.findIndex((x) => x.imageURL === imageURL);
    const image = images[imageIndex];
    const newImage = { ...image, croppedImageUrl, crop, zoom, aspect };
    newImageList[imageIndex] = newImage;
    setImages(newImageList);
    const filterSelectedImages = selectedImages.filter(image => image !== imageURL);
    setSelectedImages(filterSelectedImages);
  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
  };

  function deleteHandler(image) {
    // console.log(image);
    setImages(images?.filter((e) => e.croppedImageUrl !== image));
    // URL.revokeObjectURL(image);
  }



  return (
    <div>
      <div className="my-12 md:my-16">
        <label className="mx-auto flex flex-col justify-center items-center border border-lime-500 text-blue-400 rounded-md w-24 h-24 text-center cursor-pointer">
          + Add Images
          <br />
          <input
            type="file"
            name="images"
            onChange={onSelectFile}
            multiple
            accept="image/png , image/jpeg, image/webp"
            className="hidden"
          />
        </label>
      </div>

      <div className="py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {
          selectedImages?.length ?
            selectedImages.map(image => {
              return <ImageCropDialog
                key={image}
                imageURL={image}
                onCancel={onCancel}
                setCroppedImageFor={setCroppedImageFor}
                resetImage={resetImage}
              >

              </ImageCropDialog>
            })
            :
            null
        }
      </div>

      <div className="w-full md:w-1/2 mx-4 md:mx-auto py-8 md:py-12">

        {images.length ?
          images.map((image, index) => {
            return (
              <div key={index} className="border-2 py-12 md:py-16 rounded-md">
                <div className="flex justify-center items-center my-4">
                  <img src={image?.croppedImageUrl} className=" rounded-md" alt="upload" />
                </div>
                <div className="text-center my-2">
                  <button className="border px-2 bg-orange-500 text-white capitalize rounded-lg mx-2" onClick={() => deleteHandler(image?.croppedImageUrl)}>
                    delete image
                  </button>
                  <a href={image?.croppedImageUrl} download={"download_img"}>
                    <button className="border px-2 bg-blue-500 text-white capitalize rounded-lg mx-2">Download</button>
                  </a>
                </div>

              </div>
            );
          })
          :
          null
        }

      </div>
    </div>
  );
}

export default App;
