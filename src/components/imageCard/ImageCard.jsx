import React from 'react';

const ImageCard = ({ image, deleteHandler }) => {
    return (
        <div className="border-2 p-12 md:p-16 rounded-md">
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
};

export default ImageCard;