var initialState = [];
const todos = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          completed: false,
          isEdit: false,
        },
      ];

    case "ADD_ALL_ITEM":
      return (state = action.items);

    case "CHANGE_ITEM":
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, title: action.title, isEdit: !todo.isEdit }
          : todo
      );
    case "TOGGLE_COMPLETION":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "REMOVE_ITEM":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

export default todos;
