export const getShoeById = (shoes, shoeID) => {
  return shoes.find((shoe) => shoeID === shoe.id);
};

export const getGreeting = () => {
  let today = new Date().toLocaleTimeString().split(" ");
  if (today[1] === "AM") return "Good morning";
  else if (today[1] === "PM") return "Good after noon";
};

export const getTime = () => {
  let today = new Date().toLocaleTimeString().split(" ");
  return today[0].slice(0, 5);
};

export const isFormValid = (newShoe) => {
  const values = Object.values(newShoe);
  return values.every((val) => !!val);
};
