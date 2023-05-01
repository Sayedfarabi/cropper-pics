import { useState } from "react";
import ImageCropDialog from "./components/imageCropDialog/ImageCropDialog";
import ImageCard from "./components/imageCard/ImageCard";
import InputImage from "./components/input-image/InputImage";
import Navbar from "./components/navbar/Navbar";
import Banner from "./components/banner/Banner";
import FeatureSection from "./components/feature-section/FeatureSection";
import Footer from "./components/footer/Footer";


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
    setImages(images?.filter((e) => e.croppedImageUrl !== image));
  }



  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <InputImage onSelectFile={onSelectFile}></InputImage>

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
              <ImageCard
                key={index}
                image={image}
                deleteHandler={deleteHandler}>
              </ImageCard>
            );
          })
          :
          null
        }
      </div>
      <FeatureSection></FeatureSection>
      <Footer></Footer>
    </div>
  );
}

export default App;
