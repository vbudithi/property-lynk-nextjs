import SearchSection from "@/components/SearchSection";
import PropertySearchForm from "@/components/PropertySearchForm";
import Properties from "@/components/Properties";

const PropertiesPage = async () => {
  return (
    <>
      <SearchSection>
        <PropertySearchForm />
      </SearchSection>
      <Properties />
    </>
  );
};

export default PropertiesPage;
