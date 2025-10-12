import Image from "next/image";

const PropertyHeaderImage = ({ image, priority }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <div className="relative h-[400px] w-full">
            <Image
              src={`/images/properties/${image}`}
              alt="main property image"
              fill
              priority={false}
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
