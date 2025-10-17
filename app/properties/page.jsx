import PropertiesGrid from "@/components/PropertyGrid";
import { fetchProperties } from "@/utils/request";

const PropertiesPage = async () => {
  const data = await fetchProperties();

  // 🛡 Defensive check BEFORE accessing data.properties
  if (!data || !Array.isArray(data.properties)) {
    console.error("Failed to fetch or parse property data.");
    return (
      <section className="px-4 py-6 text-center text-gray-500">
        <p>No properties found</p>
      </section>
    );
  }

  const allProperties = data.properties.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
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
