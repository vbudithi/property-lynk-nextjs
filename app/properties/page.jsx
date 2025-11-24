import PropertyGrid from "@/components/PropertyGrid";
import { fetchProperties } from "@/utils/request";

const PropertiesPage = async () => {
  const data = await fetchProperties();
  const properties = data?.properties;

  //API failed or properties missing
  if (!data || !Array.isArray(properties)) {
    return (
      <section className="px-4 py-6 text-center text-gray-500">
        <p>No properties found</p>
      </section>
    );
  }

  //sort newest -> oldest
  const allProperties = properties.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  //empty list
  if (allProperties.length === 0) {
    return (
      <section className="px-4 py-6 text-center text-gray-500">
        <p>No properties found</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <PropertyGrid properties={properties} />
      </div>
    </section>
  );
};

export default PropertiesPage;
