export const apiBaseUrl =
  process.env.REACT_APP_API_ENV === "dev"
    ? "http://localhost:5000/api"
    : "https://f1gfker4o6.execute-api.us-east-1.amazonaws.com/dev/api";

export const s3BaseUrl = "https://detrove-s3-images.s3.amazonaws.com";
export const s3Object = (key) => {
  if (!key || key === "unknown") return null;

  return `${s3BaseUrl}/${key}`;
};

export const defaultSneaker = {
  id: "unknown",
  brand: "unknown",
  colorway: "unknown",
  description: "unknown",
  gender: "unknown",
  name: "unknown",
  release_date: "unknown",
  retail_price: "unknown",
  style_code: "unknown",
};
