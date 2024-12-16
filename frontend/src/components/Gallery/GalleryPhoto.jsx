import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import imageData from './Images';

function GalleryPhoto() {
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');

    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    };

    // Define the closeModal function
    const closeModal = () => {
        setModel(false);
        setTempImgSrc(''); // Clear the temporary image source
    };

    return (
        <>
            <div className={`${model ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-500 overflow-hidden z-50`}>
                {tempImgSrc && (
                    <Image 
                        src={tempImgSrc} 
                        alt="Enlarged" 
                        layout="fill" 
                        objectFit="contain" 
                        className="p-20 mx-auto"
                    />
                )}
                <AiOutlineClose className="absolute top-2 right-2 cursor-pointer text-white text-2xl" onClick={closeModal} />
            </div>

            <div className="gallery grid grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1 p-3">
                {imageData.map((item) => (
                    <div className="pics cursor-pointer mb-3 transition ease-out duration-350 hover:opacity-80" key={item.id} onClick={() => getImg(item.imgSrc)}>
                        <Image 
                            src={item.imgSrc} 
                            alt={`image-${item.id}`} 
                            width={500} 
                            height={300}
                            className="w-full" 
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default GalleryPhoto;
