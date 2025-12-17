const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//fetch all properties
async function fetchProperties() {
  if (!apiDomain) {
    console.warn("API domain is not defined");
    return null;
  }
  try {
    const res = await fetch(`${apiDomain}/properties`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to fetch properties`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}

//fetch single property
async function fetchProperty(id) {
  if (!apiDomain) {
    console.warn("API domain is not defined");
    return null;
  }

  try {
    const res = await fetch(`${apiDomain}/properties/${id}`);
    const data = await res.json();
    console.log("Fetch property response status:", res.status);
    console.log("Fetch property response data:", JSON.stringify(data, null, 2));

    if (!res.ok) {
      throw new Error(`Failed to fetch properties`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}

//fetch featured properties
async function fetchFeaturedProperties() {
  if (!apiDomain) {
    console.warn("API Domain is not defined");
    return null;
  }
  try {
    const res = await fetch(`${apiDomain}/properties/featured`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to fetch properties`);
    }
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}

export { fetchProperties, fetchProperty, fetchFeaturedProperties };
