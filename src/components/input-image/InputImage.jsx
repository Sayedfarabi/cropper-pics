import React from 'react';

const InputImage = ({ onSelectFile }) => {
    return (
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
    );
};

export default InputImage;