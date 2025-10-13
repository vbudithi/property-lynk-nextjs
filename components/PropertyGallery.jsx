import Image from "next/image";

/**
 * PropertyGallery component
 * Expects: property.images → ["a1.jpg", "a2.jpg", "a3.jpg"]
 */
const PropertyGallery = ({ images }) => {
  debugger;
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-lg font-bold mb-6">Property Gallery</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full h-64 rounded-lg overflow-hidden group"
          >
            <Image
              src={`/images/properties/${img}`}
              alt="gallery images"
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
              fill
            />
            {/* Optional hover overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGallery;
