const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//fetch all
async function fetchProperties() {
  if (!apiDomain) {
    console.warn("API domain is not defined");
    return null;
  }

  try {
    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error(`Failed to fetch properties`);
    }
    return res.json();
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

    if (!res.ok) {
      throw new Error(`Failed to fetch properties`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}
export { fetchProperties, fetchProperty };
