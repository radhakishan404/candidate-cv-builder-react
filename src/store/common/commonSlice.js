import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_users_add, api_users_get, api_users_get_list, api_users_update } from "./commonApi";
import { parser_users_get, parser_users_get_list } from "./commonParser";

const initialState = {
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
  users_data_loading: false,
  add_loading: false,
  users_data: [],
  users_meta: {
    page: 0,
    perPage: 10,
    sortBy: "DESC",
    sortField: "createdAt",
    search: ""
  },
  users_data_count: 0,
  unique_users_data: null
};

export const usersGetList = createAsyncThunk(
  "usersGetList",
  async (payload) => {
    try {
      const { params } = payload;
      const response = await api_users_get_list(params);
      const data = parser_users_get_list(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const usersAdd = createAsyncThunk(
  "usersAdd",
  async (payload) => {
    try {
      const response = await api_users_add(payload);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const usersUpdate = createAsyncThunk(
  "usersUpdate",
  async (payload) => {
    try {
      const response = await api_users_update(payload);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getUniqueUsers = createAsyncThunk(
  "getUniqueUsers",
  async (payload) => {
    try {
      const response = await api_users_get(payload);
      const data = parser_users_get(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSnackBar: (state, action) => {
      state.snackbar = action.payload;
    },
    setUsersMeta: (state, action) => {
      const { meta } = action.payload;
      state.users_meta = {
        ...state.users_meta,
        ...meta,
      }
    },
  },
  extraReducers: {
    [usersGetList.pending]: (state, action) => {
      state.users_data_loading = true;
    },
    [usersGetList.fulfilled]: (state, action) => {
      const { count, data } = action.payload;
      state.users_data_loading = false;
      state.users_data = data;
      state.users_data_count = count;
    },
    [usersGetList.rejected]: (state, action) => {
      state.users_data_loading = false;
    },
    // Add users
    [usersAdd.pending]: (state, action) => {
      state.add_loading = true;
    },
    [usersAdd.fulfilled]: (state, action) => {
      state.add_loading = false;
    },
    [usersAdd.rejected]: (state, action) => {
      state.add_loading = false;
    },
    // Update users
    [usersUpdate.pending]: (state, action) => {
      state.add_loading = true;
    },
    [usersUpdate.fulfilled]: (state, action) => {
      state.add_loading = false;
      state.unique_users_data = null
    },
    [usersUpdate.rejected]: (state, action) => {
      state.add_loading = false;
    },
    // Get users
    [getUniqueUsers.pending]: (state, action) => {
      state.users_data_loading = true;
    },
    [getUniqueUsers.fulfilled]: (state, action) => {
      state.users_data_loading = false;
      state.unique_users_data = action.payload
    },
    [getUniqueUsers.rejected]: (state, action) => {
      state.users_data_loading = false;
    },

  }
});

// Action creators are generated for each case reducer function
export const {
  setSnackBar,
  setUsersMeta,
  setUniqueUsersData,
} = common.actions;

export default common.reducer;
