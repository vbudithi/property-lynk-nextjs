import PropertiesGrid from "@/components/PropertyGrid";
import { fetchProperties } from "@/utils/request";

const PropertiesPage = async () => {
  const data = await fetchProperties();

  // //sort properties by date
  // data.properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const allProperties = data.properties.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  if (!Array.isArray(allProperties) || allProperties.length === 0) {
    return (
      <section className="px-4 py-6 text-center">
        <p>No properties found</p>
      </section>
    );
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <PropertiesGrid properties={allProperties} />
      </div>
    </section>
  );
};

export default PropertiesPage;
