import { configureStore } from "@reduxjs/toolkit";

import axiosInterceptor from "../helpers/axios.js";
import commonSlice from "./common/commonSlice.js";

const store = configureStore({
  reducer: {
    common: commonSlice,
  },
});

axiosInterceptor(store.dispatch);

export { store };
