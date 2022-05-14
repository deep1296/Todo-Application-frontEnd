import { store } from "../store";
import { GET_TODOS, GET_TODOS_ERROR, GET_TODOS_LOADING } from "./action";

const initialState = {
  loading: false,
  error: false,
  todos: [],
};

export const todosReducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case GET_TODOS:
      return { ...store, todos: [...payload], error: false, loading: false };
    case GET_TODOS_LOADING:
      return { ...store, loading: true, error: false };
    case GET_TODOS_ERROR:
      return { ...store, loading: false, error: true };
    default:
      return store;
  }
};