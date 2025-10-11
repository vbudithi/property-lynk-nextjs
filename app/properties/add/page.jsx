import React from "react";

const PropertyAddPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {}, [id, property]);

  return <div>PropertyAddPage</div>;
};

export default PropertyAddPage;
