import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <div className="relative h-[400px] w-full">
            <Image
              src={image}
              alt="main property image"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
