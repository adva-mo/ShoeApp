export const shoesReducer = (state, action) => {
  // console.log(state, action);
  console.log("in redcucer func");
  switch (action.type) {
    case "FETCHED":
      return [...action.playload];
    // case "DELETE-MEMBER":
    //   return deleteMember(action.playload, state);
    case "ADD-SHOE":
      return addShoe(action.playload, state);
    // case "EDIT-MEMBER":
    //   return editMember(action.playload, state);
    default:
      return state;
  }
};

export const deleteMember = (id, state) => {
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

// export const editMember = ({ id, memberData }, state) => {
//   return state.map((m) => {
//     if (m.id === id) {
//       return { ...m, ...memberData };
//     } else {
//       return m;
//     }
//   });
// //   console.log(id);
// //   console.log("edit function");
// //   console.log(state.find((m) => m.id === id));
// //   return [state];
// };
