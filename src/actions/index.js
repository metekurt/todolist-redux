import axios from "axios";

let nextTodoId = 1;

export const addItem = (id, title) => {
  return {
    type: "ADD_ITEM",
    id,
    title,
  };
};

export const addAllItem = (items) => {
  return {
    type: "ADD_ALL_ITEM",
    items,
  };
};

export const changeItem = (id, title) => {
  return {
    type: "CHANGE_ITEM",
    id,
    title,
  };
};

export const toggleCompletion = (id) => {
  return {
    type: "TOGGLE_COMPLETION",
    id,
  };
};

export const removeItem = (id) => {
  return {
    type: "REMOVE_ITEM",
    id,
  };
};

export const getList = () => {
  return (dispatch) => {
    axios
      .get("https://mete-fake-server-app.herokuapp.com/items/")
      .then((response) => {
        dispatch(addAllItem(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const changeOnWeb = (id, title, status) => {
  return (dispatch) => {
    axios
      .put("https://mete-fake-server-app.herokuapp.com/items/" + id, {
        title,
        completed: status,
      })
      .then(() => {
        dispatch(changeItem(id, title));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const toggleOnWeb = (id, title, status) => {
  return (dispatch) => {
    axios
      .put("https://mete-fake-server-app.herokuapp.com/items/" + id, {
        title,
        completed: !status,
      })
      .then((response) => {
        dispatch(toggleCompletion(response.data.id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addItemtoWeb = (title) => {
  return (dispatch) => {
    axios
      .post("https://mete-fake-server-app.herokuapp.com/items/", {
        id: nextTodoId++,
        title,
        completed: false,
      })
      .then((response) => {
        dispatch(addItem(response.id, response.data.title));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const removeItemFromWeb = (id) => {
  return (dispatch) => {
    axios
      .delete("https://mete-fake-server-app.herokuapp.com/items/" + id)
      .then(() => {
        dispatch(removeItem(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
