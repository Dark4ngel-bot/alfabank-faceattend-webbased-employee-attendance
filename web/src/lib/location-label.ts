type NominatimAddress = Record<string, string | undefined>;

type NominatimResponse = {
  error?: string;
  name?: string;
  display_name?: string;
  address?: NominatimAddress;
};

function clean(value?: string | null) {
  return String(value || "").trim();
}

function pickAddress(address: NominatimAddress, keys: string[]) {
  for (const key of keys) {
    const value = clean(address[key]);

    if (value) {
      return value;
    }
  }

  return "";
}

function buildNearestArea(data: NominatimResponse) {
  const address = data.address || {};

  const road = pickAddress(address, [
    "road",
    "pedestrian",
    "footway",
    "path",
    "residential",
  ]);

  const neighbourhood = pickAddress(address, [
    "neighbourhood",
    "suburb",
    "hamlet",
    "village",
    "city_district",
  ]);

  const city = pickAddress(address, [
    "city",
    "town",
    "county",
    "municipality",
    "state_district",
  ]);

  const state = clean(address.state);
  const placeName =
    clean(data.name) ||
    pickAddress(address, [
      "office",
      "company",
      "building",
      "amenity",
      "shop",
      "tourism",
      "attraction",
    ]);

  return [placeName, road, neighbourhood, city, state]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .slice(0, 4)
    .join(", ");
}

export async function getNearestLocationLabel(
  latitude: number | null,
  longitude: number | null,
) {
  if (latitude === null || longitude === null) {
    return "Lokasi belum tersedia";
  }

  try {
    const reverseUrl = new URL("https://nominatim.openstreetmap.org/reverse");

    reverseUrl.searchParams.set("format", "jsonv2");
    reverseUrl.searchParams.set("lat", String(latitude));
    reverseUrl.searchParams.set("lon", String(longitude));
    reverseUrl.searchParams.set("zoom", "18");
    reverseUrl.searchParams.set("addressdetails", "1");

    const response = await fetch(reverseUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": "id,en;q=0.8",
        "User-Agent": "Presensi/1.0 Development",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    const data = (await response.json()) as NominatimResponse;

    if (!response.ok || data.error) {
      return "Lokasi terdeteksi";
    }

    return (
      buildNearestArea(data) ||
      clean(data.display_name).split(",").slice(0, 4).join(", ") ||
      "Lokasi terdeteksi"
    );
  } catch {
    return "Lokasi terdeteksi";
  }
}
