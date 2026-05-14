export const formatPrice = (price) => {
  if (price >= 1000000000) {
    return `₦${(price / 1000000000).toFixed(1)}B`;
  }
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(1)}M`;
  }
  return `₦${price.toLocaleString()}`;
};

export const formatSqft = (sqft) => {
  return `${sqft.toLocaleString()} sq ft`;
};

export const formatNumber = (num) => {
  return num.toLocaleString();
};