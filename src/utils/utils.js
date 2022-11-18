export const getShoeById = (shoes, shoeID) => {
  return shoes.find((shoe) => shoeID === shoe.id);
};
