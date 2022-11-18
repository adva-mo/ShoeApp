export const shoesReducer = (state, action) => {
  switch (action.type) {
    case "FETCHED":
      return [...action.playload];
    case "DELETE-SHOE":
      return deleteShoe(action.playload, state);
    case "ADD-SHOE":
      return addShoe(action.playload, state);
    case "EDIT-SHOE":
      return editShoe(action.playload, state);
    default:
      return state;
  }
};

export const deleteShoe = (id, state) => {
  return state.filter((member) => {
    return id !== member.id;
  });
};

export const addShoe = (obj, state) => {
  console.log("member added");
  return [...state, obj];
};

export const editShoe = ({ price, id }, state) => {
  return state.map((m) => {
    if (m.id === id) {
      return { ...m, price: price };
    } else {
      return m;
    }
  });
};
