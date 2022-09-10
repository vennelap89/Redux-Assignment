
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [{ id: "", title: "",  userId: "" }],
  loading: false,
  error: "",
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    pending(state) {
      return {
        ...state,
        loading: true,
        error: false,
      };
    },
    errored(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    fetchPostsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload,
      };
    },
    postPostSuccess(state, action) {
      return {
        ...state,
        loading: false,
        error: "",
        data: [action.payload, ...state.data],
      };
    },
  },
});

export const { pending, errored, fetchPostsSuccess, postPostSuccess } =
  postSlice.actions;

export default postSlice.reducer;

export const viewData = () => async (dispatch) => {
  dispatch(pending());
  fetch("https://jsonplaceholder.typicode.com/albums")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.splice(0,0));
      dispatch(fetchPostsSuccess(data.splice(0,100)));
    })
    .catch((error) => {
      dispatch(errored(error.message));
    });
};
