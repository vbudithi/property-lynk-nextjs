import Image from "next/image";

const PropertyGallery = ({ images }) => {
  if (!Array.isArray(images) || images.length === 0) return null;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-6">Property Gallery</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-64 rounded-lg overflow-hidden group "
          >
            <Image
              src={`/images/properties/${img}`}
              alt="gallery images"
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
