'use client';

// const Map = dynamic(() => import('../../../components/Map'), { ssr: false });
// const L = dynamic(() => import("leaflet"), { ssr: false });

const getAllCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      return data;
    } else {
      throw new Error("Không tìm thấy địa chỉ");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null; // Trả về null nếu có lỗi
  }
}

const getCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0]; // Lấy lat và lon từ kết quả
      return { lat, lon };
    } else {
      throw new Error("Không tìm thấy địa chỉ");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null; // Trả về null nếu có lỗi
  }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      0.5 - Math.cos(dLat)/2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };

const FindCost = (distance) => {
    return (12000 * Math.min(2, distance) + Math.max(distance-2, 0) * 3400).toFixed(0)
}

const findCostFromAddress = async (origin, destination) => {
  const originCoords = await getCoordinates(origin);
  const destinationCoords = await getCoordinates(destination);

  if (originCoords && destinationCoords) {
    const distance = calculateDistance(
      originCoords.lat,
      originCoords.lon,
      destinationCoords.lat,
      destinationCoords.lon
    );

    return FindCost(distance);
  } else {
    return null;
  }
};

export { FindCost, calculateDistance, getCoordinates, getAllCoordinates, findCostFromAddress };