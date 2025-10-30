import Image from "next/image";
import { useState } from "react";

const PropertyGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-6">Property Gallery</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-64 rounded-lg overflow-hidden group"
          >
            <a
              href={image}
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                setSelectedImage(image);
              }}
            >
              <Image
                src={image}
                alt="gallery image"
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
                fill
              />
            </a>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 "
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-[90%] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 rounded-full px-3 py-1 hover:bg-opacity-80 z-50 cursor-pointer"
            >
              ✕
            </button>
            <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="enlarged image"
                className="object-contain w-full h-full bg-transparent"
                fill
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
