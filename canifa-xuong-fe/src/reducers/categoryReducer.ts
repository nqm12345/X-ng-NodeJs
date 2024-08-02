import { Category } from "../interfaces/Category";

type State = {
  categories: Category[];
};

type Action = {
  type: string;
  payload: any;
};

const categoryReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
      };

    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default categoryReducer;
