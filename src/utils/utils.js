export const getShoeById = (shoes, shoeID) => {
  return shoes.find((shoe) => shoeID === shoe.id);
};

export const getGreeting = () => {
  let today = new Date().toLocaleTimeString().split(" ");
  if (today[1] === "AM") return "good morning";
  else if (today[1] === "PM") return "good after noon";

  // return today[1];
  // console.log(today[4]);
};

export const getTime = () => {
  let today = new Date().toLocaleTimeString().split(" ");
  return today[0].slice(0, 5);
};
