const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  if (!apiDomain) {
    console.warn("API domain is not defined");
    return [];
  }

  try {
    const res = await fetch(`${apiDomain}/properties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.status}`);
    }

    const data = await res.json();
    return data.properties || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export { fetchProperties };
