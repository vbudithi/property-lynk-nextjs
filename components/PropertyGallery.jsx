import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

const PropertyGallery = ({ images }) => {
  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <Gallery>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Property Gallery</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <Item
              key={index}
              original={image}
              thumbnail={image}
              width="1024"
              height="768"
            >
              {({ ref, open }) => (
                <div
                  ref={ref}
                  onClick={open}
                  className="relative w-full h-64 rounded-lg overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
              )}
            </Item>
          ))}
        </div>
      </div>
    </Gallery>
  );
};

export default PropertyGallery;
