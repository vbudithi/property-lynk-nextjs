import PropertiesGrid from "@/components/PropertyGrid";

const PropertiesPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch properties");

  const data = await res.json();
  const properties = data.properties || [];

  //sort properties by date
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <section className="px-4 py-6 text-center">
        <p>No properties found</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <PropertiesGrid properties={properties} />
      </div>
    </section>
  );
};

export default PropertiesPage;
