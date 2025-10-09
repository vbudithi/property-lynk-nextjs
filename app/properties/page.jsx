import PropertiesGrid from "@/components/PropertyGrid";
import { fetchProperties } from "@/utils/request";

const PropertiesPage = async () => {
  const properties = await fetchProperties();

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
