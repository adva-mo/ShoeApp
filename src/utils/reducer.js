export const shoesReducer = (state, action) => {
  // console.log(state, action);
  console.log("in redcucer func");
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
  // console.log(state);
  // console.log("in delete func, id: " + id);
  return state.filter((member) => {
    return id !== member.id;
  });
};

export const addShoe = (obj, state) => {
  console.log("member added");
  return [...state, obj];
};

export const editShoe = ({ price, id }, state) => {
  // console.log(id);
  // console.log(price);
  return state.map((m) => {
    if (m.id === id) {
      return { ...m, price: price };
    } else {
      return m;
    }
  });
};
// //   console.log(id);
// //   console.log("edit function");
// //   console.log(state.find((m) => m.id === id));
// //   return [state];
// };
